import type { Prisma } from '@prisma/client';
import { z } from 'zod';

export const ChatMessageActionUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.ChatMessageActionUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  messageId: z.string(),
  action: z.string()
}).strict();

export default ChatMessageActionUncheckedCreateWithoutUserInputSchema;
