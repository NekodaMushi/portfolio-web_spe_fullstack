
import { z } from 'zod';

export const QuizGenerationSchema = z.object({
  numQuestions: z.string().refine(value => ['1', '5', '10', '20', '30'].includes(value), {
    message: "Invalid number of questions"
  }),
});

export type QuizGenerationRequest = z.infer<typeof QuizGenerationSchema>;
