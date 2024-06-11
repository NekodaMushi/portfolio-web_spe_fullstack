import { z } from 'zod';

export const TranscriptSchema = z.object({
  spanData: z.array(z.string()),
  videoTitle: z.string()
});

export type TranscriptRequest = z.infer<typeof TranscriptSchema>;

