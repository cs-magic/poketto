import type { Prisma } from '@prisma/client';
import { z } from 'zod';

export const ChatMessageActionCreateManyMessageInputSchema: z.ZodType<Prisma.ChatMessageActionCreateManyMessageInput> = z.object({
  id: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  userId: z.string(),
  action: z.string()
}).strict();

export default ChatMessageActionCreateManyMessageInputSchema;
