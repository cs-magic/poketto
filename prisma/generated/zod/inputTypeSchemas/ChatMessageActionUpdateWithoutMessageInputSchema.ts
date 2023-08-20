import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { DateTimeFieldUpdateOperationsInputSchema } from './DateTimeFieldUpdateOperationsInputSchema';
import { UserUpdateOneRequiredWithoutChatMessageActionsNestedInputSchema } from './UserUpdateOneRequiredWithoutChatMessageActionsNestedInputSchema';

export const ChatMessageActionUpdateWithoutMessageInputSchema: z.ZodType<Prisma.ChatMessageActionUpdateWithoutMessageInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  action: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutChatMessageActionsNestedInputSchema).optional()
}).strict();

export default ChatMessageActionUpdateWithoutMessageInputSchema;
