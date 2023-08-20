import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ChatMessageCreateNestedOneWithoutUserActionOnMessageInputSchema } from './ChatMessageCreateNestedOneWithoutUserActionOnMessageInputSchema';

export const ChatMessageActionCreateWithoutUserInputSchema: z.ZodType<Prisma.ChatMessageActionCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  action: z.string(),
  message: z.lazy(() => ChatMessageCreateNestedOneWithoutUserActionOnMessageInputSchema)
}).strict();

export default ChatMessageActionCreateWithoutUserInputSchema;
