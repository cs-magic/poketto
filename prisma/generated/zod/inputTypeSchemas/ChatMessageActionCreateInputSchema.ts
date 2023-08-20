import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserCreateNestedOneWithoutChatMessageActionsInputSchema } from './UserCreateNestedOneWithoutChatMessageActionsInputSchema';
import { ChatMessageCreateNestedOneWithoutUserActionOnMessageInputSchema } from './ChatMessageCreateNestedOneWithoutUserActionOnMessageInputSchema';

export const ChatMessageActionCreateInputSchema: z.ZodType<Prisma.ChatMessageActionCreateInput> = z.object({
  id: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  action: z.string(),
  user: z.lazy(() => UserCreateNestedOneWithoutChatMessageActionsInputSchema),
  message: z.lazy(() => ChatMessageCreateNestedOneWithoutUserActionOnMessageInputSchema)
}).strict();

export default ChatMessageActionCreateInputSchema;
