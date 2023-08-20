import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { DateTimeFieldUpdateOperationsInputSchema } from './DateTimeFieldUpdateOperationsInputSchema';
import { BoolFieldUpdateOperationsInputSchema } from './BoolFieldUpdateOperationsInputSchema';
import { ChatMessageUpdateManyWithoutConversationNestedInputSchema } from './ChatMessageUpdateManyWithoutConversationNestedInputSchema';
import { AppUpdateOneRequiredWithoutUsingNestedInputSchema } from './AppUpdateOneRequiredWithoutUsingNestedInputSchema';

export const ConversationUpdateWithoutUserInputSchema: z.ZodType<Prisma.ConversationUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  pinned: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  messages: z.lazy(() => ChatMessageUpdateManyWithoutConversationNestedInputSchema).optional(),
  app: z.lazy(() => AppUpdateOneRequiredWithoutUsingNestedInputSchema).optional()
}).strict();

export default ConversationUpdateWithoutUserInputSchema;
