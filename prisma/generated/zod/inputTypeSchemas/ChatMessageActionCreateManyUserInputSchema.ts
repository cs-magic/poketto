import type { Prisma } from '@prisma/client';
import { z } from 'zod';

export const ChatMessageActionCreateManyUserInputSchema: z.ZodType<Prisma.ChatMessageActionCreateManyUserInput> = z.object({
  id: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  messageId: z.string(),
  action: z.string()
}).strict();

export default ChatMessageActionCreateManyUserInputSchema;
