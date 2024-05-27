import { z } from 'zod';

export const MessageSchema = z.object({
  id: z.string(),
  isUserMessage: z.boolean(),
  text: z.string()
})

// array passing down all previous messages to add context to AI
export const MessageArraySchema = z.array(MessageSchema);

export type Message = z.infer<typeof MessageSchema>;
