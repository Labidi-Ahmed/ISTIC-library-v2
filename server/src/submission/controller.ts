import {prisma} from '@/lib/prisma';
import {uploadPdfToS3} from '@/lib/S3';
import {User} from '@prisma/client';
import {Request, Response} from 'express';

export const createSubmission = async (req: Request, res: Response) => {
  try {
    console.log('Creating submission with data:', {
      file: req.file?.originalname,
      body: req.body,
      user: req.user,
    });
    if (!req.file) {
      res.status(400).json({
        success: false,
        message: 'File is required',
      });
      return;
    }

    const {professorId, message} = req.body;

    if (!professorId) {
      res.status(400).json({
        success: false,
        message: 'Professor ID and is required',
      });

      return;
    }

    const existingSubmission = await prisma.submission.findUnique({
      where: {
        studentId: (req.user as User).id,
      },
    });

    if (existingSubmission) {
      res.status(400).json({
        success: false,
        message: 'You have already submitted a report.',
      });
      return;
    }

    const pdfBuffer = req.file.buffer;
    const fileName = `${(req.user as User).username}-${Date.now()}.pdf`;
    const pdfUrl = await uploadPdfToS3(pdfBuffer, fileName);

    const createdSubmission = await prisma.submission.create({
      data: {
        professorId,
        studentId: (req.user as User).id,
        title: (req.user as User).username + ' report submission',
      },
    });

    await prisma.version.create({
      data: {
        submissionId: createdSubmission.id,
        filePath: pdfUrl,
        studentMessage: message || '',
      },
    });

    console.log('Submission created successfully:', createdSubmission);
    res.status(201).json({
      message: 'Submission created successfully',
      submission: createdSubmission,
    });
    return;
  } catch (error) {
    console.error('Error creating submission:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create submission',
    });

    return;
  }
};
