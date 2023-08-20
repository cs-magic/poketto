import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { DateTimeFieldUpdateOperationsInputSchema } from './DateTimeFieldUpdateOperationsInputSchema';
import { NullableStringFieldUpdateOperationsInputSchema } from './NullableStringFieldUpdateOperationsInputSchema';
import { PromptRoleTypeSchema } from './PromptRoleTypeSchema';
import { EnumPromptRoleTypeFieldUpdateOperationsInputSchema } from './EnumPromptRoleTypeFieldUpdateOperationsInputSchema';
import { ChatMessageFormatTypeSchema } from './ChatMessageFormatTypeSchema';
import { EnumChatMessageFormatTypeFieldUpdateOperationsInputSchema } from './EnumChatMessageFormatTypeFieldUpdateOperationsInputSchema';

export const ChatMessageUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ChatMessageUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => PromptRoleTypeSchema),z.lazy(() => EnumPromptRoleTypeFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  format: z.union([ z.lazy(() => ChatMessageFormatTypeSchema),z.lazy(() => EnumChatMessageFormatTypeFieldUpdateOperationsInputSchema) ]).optional(),
  conversationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export default ChatMessageUncheckedUpdateManyInputSchema;
