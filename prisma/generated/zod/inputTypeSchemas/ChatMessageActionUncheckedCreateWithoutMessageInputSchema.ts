import type { Prisma } from '@prisma/client';
import { z } from 'zod';

export const ChatMessageActionUncheckedCreateWithoutMessageInputSchema: z.ZodType<Prisma.ChatMessageActionUncheckedCreateWithoutMessageInput> = z.object({
  id: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  userId: z.string(),
  action: z.string()
}).strict();

export default ChatMessageActionUncheckedCreateWithoutMessageInputSchema;
