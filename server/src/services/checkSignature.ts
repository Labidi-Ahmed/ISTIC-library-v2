import {createGroq} from '@ai-sdk/groq';
import {generateObject} from 'ai';
import fs from 'fs';
import {z} from 'zod';

export const groq = createGroq({
  apiKey: process.env.GROQ,
});

const SignatureCheckSchema = z.object({
  isSigned: z
    .boolean()
    .describe('Indicates whether the image contains a handwritten signature'),
  explanation: z.string().describe('A brief explanation of the analysis'),
});

export const checkSignature = async () => {
  const systemPrompt =
    'You are an AI assistant that analyzes images. Your task is to determine if an image contains a handwritten signature or not. Return a structured response with a boolean indicating if a signature is present and a brief explanation.';

  const result = await generateObject({
    model: groq('meta-llama/llama-4-scout-17b-16e-instruct'),
    schema: SignatureCheckSchema,
    messages: [
      {
        role: 'system',
        content: systemPrompt,
      },
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: 'Does this image contain a signature? Provide a boolean indicating if a signature is present and a brief explanation.',
          },
          {
            type: 'image',
            image: fs.readFileSync('./resultImage.1.png'),
          },
        ],
      },
    ],
  });

  return result.object; // Returns { isSigned: boolean, explanation: string }
};
