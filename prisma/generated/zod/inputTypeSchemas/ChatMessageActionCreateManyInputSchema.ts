import type { Prisma } from '@prisma/client';
import { z } from 'zod';

export const ChatMessageActionCreateManyInputSchema: z.ZodType<Prisma.ChatMessageActionCreateManyInput> = z.object({
  id: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  userId: z.string(),
  messageId: z.string(),
  action: z.string()
}).strict();

export default ChatMessageActionCreateManyInputSchema;
