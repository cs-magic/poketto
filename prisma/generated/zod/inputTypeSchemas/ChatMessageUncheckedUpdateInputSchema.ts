import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { DateTimeFieldUpdateOperationsInputSchema } from './DateTimeFieldUpdateOperationsInputSchema';
import { NullableStringFieldUpdateOperationsInputSchema } from './NullableStringFieldUpdateOperationsInputSchema';
import { PromptRoleTypeSchema } from './PromptRoleTypeSchema';
import { EnumPromptRoleTypeFieldUpdateOperationsInputSchema } from './EnumPromptRoleTypeFieldUpdateOperationsInputSchema';
import { ChatMessageFormatTypeSchema } from './ChatMessageFormatTypeSchema';
import { EnumChatMessageFormatTypeFieldUpdateOperationsInputSchema } from './EnumChatMessageFormatTypeFieldUpdateOperationsInputSchema';
import { ChatMessageActionUncheckedUpdateManyWithoutMessageNestedInputSchema } from './ChatMessageActionUncheckedUpdateManyWithoutMessageNestedInputSchema';

export const ChatMessageUncheckedUpdateInputSchema: z.ZodType<Prisma.ChatMessageUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => PromptRoleTypeSchema),z.lazy(() => EnumPromptRoleTypeFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  format: z.union([ z.lazy(() => ChatMessageFormatTypeSchema),z.lazy(() => EnumChatMessageFormatTypeFieldUpdateOperationsInputSchema) ]).optional(),
  conversationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userActionOnMessage: z.lazy(() => ChatMessageActionUncheckedUpdateManyWithoutMessageNestedInputSchema).optional()
}).strict();

export default ChatMessageUncheckedUpdateInputSchema;
