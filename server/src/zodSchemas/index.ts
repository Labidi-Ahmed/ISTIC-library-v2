// src/validation/reportSchema.js
import {z} from 'zod';

export const ReportSchema = z.object({
  class: z.string({
    required_error: 'Please select a class',
  }),
  field: z.string({
    required_error: 'Please select a field',
  }),
  description: z.string().optional(),
});

export default ReportSchema;
