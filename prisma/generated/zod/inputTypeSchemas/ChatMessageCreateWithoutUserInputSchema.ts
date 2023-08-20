import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { PromptRoleTypeSchema } from './PromptRoleTypeSchema';
import { ChatMessageFormatTypeSchema } from './ChatMessageFormatTypeSchema';
import { ChatMessageActionCreateNestedManyWithoutMessageInputSchema } from './ChatMessageActionCreateNestedManyWithoutMessageInputSchema';
import { ConversationCreateNestedOneWithoutMessagesInputSchema } from './ConversationCreateNestedOneWithoutMessagesInputSchema';

export const ChatMessageCreateWithoutUserInputSchema: z.ZodType<Prisma.ChatMessageCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  role: z.lazy(() => PromptRoleTypeSchema).optional(),
  content: z.string(),
  format: z.lazy(() => ChatMessageFormatTypeSchema).optional(),
  userActionOnMessage: z.lazy(() => ChatMessageActionCreateNestedManyWithoutMessageInputSchema).optional(),
  conversation: z.lazy(() => ConversationCreateNestedOneWithoutMessagesInputSchema)
}).strict();

export default ChatMessageCreateWithoutUserInputSchema;
