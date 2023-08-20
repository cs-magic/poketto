import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { PromptRoleTypeSchema } from './PromptRoleTypeSchema';
import { ChatMessageFormatTypeSchema } from './ChatMessageFormatTypeSchema';
import { UserCreateNestedOneWithoutChatMessagesInputSchema } from './UserCreateNestedOneWithoutChatMessagesInputSchema';
import { ConversationCreateNestedOneWithoutMessagesInputSchema } from './ConversationCreateNestedOneWithoutMessagesInputSchema';

export const ChatMessageCreateWithoutUserActionOnMessageInputSchema: z.ZodType<Prisma.ChatMessageCreateWithoutUserActionOnMessageInput> = z.object({
  id: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  role: z.lazy(() => PromptRoleTypeSchema).optional(),
  content: z.string(),
  format: z.lazy(() => ChatMessageFormatTypeSchema).optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutChatMessagesInputSchema).optional(),
  conversation: z.lazy(() => ConversationCreateNestedOneWithoutMessagesInputSchema)
}).strict();

export default ChatMessageCreateWithoutUserActionOnMessageInputSchema;
