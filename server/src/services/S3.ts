import {S3Client, PutObjectCommand} from '@aws-sdk/client-s3';
import fs from 'fs';

// AWS S3 configuration
if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
  throw new Error('AWS credentials are not configured');
}

const s3Client = new S3Client({
  region: process.env.BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

/**
 * Uploads a PDF buffer to S3 bucket
 * @param {Buffer} pdfBuffer - PDF file buffer
 * @param {string} filename - Original filename
 * @returns {Promise<string>} - URL of the uploaded PDF
 */
export async function uploadPdfToS3(
  pdfBuffer: Buffer,
  filename: string
): Promise<string> {
  try {
    const bucketName = process.env.BUCKET_NAME;
    if (!bucketName) {
      throw new Error('S3 bucket name is not configured');
    }

    // Generate a unique S3 key using timestamp and original filename
    const timestamp = new Date().getTime();
    const sanitizedFilename = filename.replace(/[^a-zA-Z0-9.-]/g, '_');
    const s3Key = `reports/${timestamp}-${sanitizedFilename}`;

    // Set parameters for upload
    const params = {
      Bucket: bucketName,
      Key: s3Key,
      Body: pdfBuffer,
      ContentType: 'application/pdf',
    };

    // Upload to S3
    const command = new PutObjectCommand(params);
    await s3Client.send(command);

    // Generate the URL for the uploaded PDF
    const region = process.env.REGION || 'us-east-1';
    const pdfUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${encodeURIComponent(s3Key)}`;
    console.log(`PDF uploaded successfully. URL: ${pdfUrl}`);

    return pdfUrl;
  } catch (error) {
    console.error('Error uploading PDF to S3:', error);
    throw error;
  }
}
