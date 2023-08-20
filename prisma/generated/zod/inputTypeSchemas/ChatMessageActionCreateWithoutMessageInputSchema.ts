import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserCreateNestedOneWithoutChatMessageActionsInputSchema } from './UserCreateNestedOneWithoutChatMessageActionsInputSchema';

export const ChatMessageActionCreateWithoutMessageInputSchema: z.ZodType<Prisma.ChatMessageActionCreateWithoutMessageInput> = z.object({
  id: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  action: z.string(),
  user: z.lazy(() => UserCreateNestedOneWithoutChatMessageActionsInputSchema)
}).strict();

export default ChatMessageActionCreateWithoutMessageInputSchema;
