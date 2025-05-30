import {Request, Response} from 'express';
import {PDFDocument} from 'pdf-lib';
import {fromBuffer} from 'pdf2pic';
import sharp from 'sharp';
import ReportSchema from '@/zodSchemas/index';
import {Console} from 'console';
import path from 'path';
import {writeFile} from 'fs/promises';
import {checkSignature} from '@/services/checkSignature';
import {uploadPdfToS3} from '@/lib/S3';

const convertPdfPage2image = async (buffer: Buffer) => {
  const pdfBuffer = buffer;
  console.log(pdfBuffer);

  // Option 1: Using pdf-lib and pdf2pic (more reliable)
  const pdfDoc = await PDFDocument.load(pdfBuffer);
  console.log(`PDF has ${pdfDoc.getPageCount()} pages`);
  const firstPage = pdfDoc.getPage(0);
  const {width, height} = firstPage.getSize();

  // Test just the image conversion
  const convert = fromBuffer(pdfBuffer, {
    density: 100,
    format: 'png',
    width: 800,
    height: 1080,
    savePath: './',
    saveFilename: 'resultImage',
  });
  const image = await convert(1);
  console.log('Image converted successfully');
  console.log('Image object:', image);
};

export const publishReport = async (req: Request, res: Response) => {
  try {
    console.log('Publishing report...');

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'File is required',
      });
    }

    const validatedData = ReportSchema.safeParse(req.body);
    if (!validatedData.success) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validatedData.error.errors,
      });
    }

    console.log('Validated data:', validatedData);

    // Process PDF
    const pdfBuffer = req.file.buffer;
    const originalFilename = req.file.originalname || 'document.pdf';

    // Generate thumbnail image
    await convertPdfPage2image(pdfBuffer);

    // Check if the PDF is signed
    const isSignedResult = await checkSignature();
    console.log('Signature check result:', isSignedResult);

    if (isSignedResult.isSigned) {
      const pdfUrl = await uploadPdfToS3(pdfBuffer, originalFilename);

      return res.status(200).json({
        success: true,
        message: 'Your report has been submitted successfully',
        url: pdfUrl,
      });
    } else {
      return res.status(403).json({
        success: false,
        message: 'Your report does not have a valid signature',
      });
    }
  } catch (error) {
    console.error('Error publishing report:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to publish report',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
