import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { PromptRoleTypeSchema } from './PromptRoleTypeSchema';
import { ChatMessageFormatTypeSchema } from './ChatMessageFormatTypeSchema';
import { UserCreateNestedOneWithoutChatMessagesInputSchema } from './UserCreateNestedOneWithoutChatMessagesInputSchema';
import { ChatMessageActionCreateNestedManyWithoutMessageInputSchema } from './ChatMessageActionCreateNestedManyWithoutMessageInputSchema';

export const ChatMessageCreateWithoutConversationInputSchema: z.ZodType<Prisma.ChatMessageCreateWithoutConversationInput> = z.object({
  id: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  role: z.lazy(() => PromptRoleTypeSchema).optional(),
  content: z.string(),
  format: z.lazy(() => ChatMessageFormatTypeSchema).optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutChatMessagesInputSchema).optional(),
  userActionOnMessage: z.lazy(() => ChatMessageActionCreateNestedManyWithoutMessageInputSchema).optional()
}).strict();

export default ChatMessageCreateWithoutConversationInputSchema;
