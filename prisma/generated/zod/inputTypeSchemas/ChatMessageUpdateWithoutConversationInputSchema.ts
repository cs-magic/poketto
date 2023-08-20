import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { DateTimeFieldUpdateOperationsInputSchema } from './DateTimeFieldUpdateOperationsInputSchema';
import { PromptRoleTypeSchema } from './PromptRoleTypeSchema';
import { EnumPromptRoleTypeFieldUpdateOperationsInputSchema } from './EnumPromptRoleTypeFieldUpdateOperationsInputSchema';
import { ChatMessageFormatTypeSchema } from './ChatMessageFormatTypeSchema';
import { EnumChatMessageFormatTypeFieldUpdateOperationsInputSchema } from './EnumChatMessageFormatTypeFieldUpdateOperationsInputSchema';
import { UserUpdateOneWithoutChatMessagesNestedInputSchema } from './UserUpdateOneWithoutChatMessagesNestedInputSchema';
import { ChatMessageActionUpdateManyWithoutMessageNestedInputSchema } from './ChatMessageActionUpdateManyWithoutMessageNestedInputSchema';

export const ChatMessageUpdateWithoutConversationInputSchema: z.ZodType<Prisma.ChatMessageUpdateWithoutConversationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => PromptRoleTypeSchema),z.lazy(() => EnumPromptRoleTypeFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  format: z.union([ z.lazy(() => ChatMessageFormatTypeSchema),z.lazy(() => EnumChatMessageFormatTypeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneWithoutChatMessagesNestedInputSchema).optional(),
  userActionOnMessage: z.lazy(() => ChatMessageActionUpdateManyWithoutMessageNestedInputSchema).optional()
}).strict();

export default ChatMessageUpdateWithoutConversationInputSchema;
