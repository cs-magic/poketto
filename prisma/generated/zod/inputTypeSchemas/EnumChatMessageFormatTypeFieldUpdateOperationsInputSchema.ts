import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ChatMessageFormatTypeSchema } from './ChatMessageFormatTypeSchema';

export const EnumChatMessageFormatTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumChatMessageFormatTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => ChatMessageFormatTypeSchema).optional()
}).strict();

export default EnumChatMessageFormatTypeFieldUpdateOperationsInputSchema;
