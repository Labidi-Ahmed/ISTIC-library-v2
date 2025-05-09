import * as z from 'zod';

export const ReportSchema = z.object({
  pdfFile: z
    .instanceof(File)
    .refine((file) => file.size > 0, 'File is required')
    .refine((file) => file.type === 'application/pdf', 'File must be a PDF'),
  class: z.string({
    required_error: 'Please select a class',
  }),
  field: z.string({
    required_error: 'Please select a field',
  }),
  description: z
    .string()

    .optional(),
});
