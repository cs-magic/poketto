import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { PromptRoleTypeSchema } from './PromptRoleTypeSchema';
import { ChatMessageFormatTypeSchema } from './ChatMessageFormatTypeSchema';
import { ChatMessageActionUncheckedCreateNestedManyWithoutMessageInputSchema } from './ChatMessageActionUncheckedCreateNestedManyWithoutMessageInputSchema';

export const ChatMessageUncheckedCreateWithoutConversationInputSchema: z.ZodType<Prisma.ChatMessageUncheckedCreateWithoutConversationInput> = z.object({
  id: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  userId: z.string().optional().nullable(),
  role: z.lazy(() => PromptRoleTypeSchema).optional(),
  content: z.string(),
  format: z.lazy(() => ChatMessageFormatTypeSchema).optional(),
  userActionOnMessage: z.lazy(() => ChatMessageActionUncheckedCreateNestedManyWithoutMessageInputSchema).optional()
}).strict();

export default ChatMessageUncheckedCreateWithoutConversationInputSchema;
