import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { DateTimeFieldUpdateOperationsInputSchema } from './DateTimeFieldUpdateOperationsInputSchema';
import { ChatMessageUpdateOneRequiredWithoutUserActionOnMessageNestedInputSchema } from './ChatMessageUpdateOneRequiredWithoutUserActionOnMessageNestedInputSchema';

export const ChatMessageActionUpdateWithoutUserInputSchema: z.ZodType<Prisma.ChatMessageActionUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  action: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  message: z.lazy(() => ChatMessageUpdateOneRequiredWithoutUserActionOnMessageNestedInputSchema).optional()
}).strict();

export default ChatMessageActionUpdateWithoutUserInputSchema;
