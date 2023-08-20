import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ChatMessageFormatTypeSchema } from './ChatMessageFormatTypeSchema';
import { NestedEnumChatMessageFormatTypeFilterSchema } from './NestedEnumChatMessageFormatTypeFilterSchema';

export const EnumChatMessageFormatTypeFilterSchema: z.ZodType<Prisma.EnumChatMessageFormatTypeFilter> = z.object({
  equals: z.lazy(() => ChatMessageFormatTypeSchema).optional(),
  in: z.lazy(() => ChatMessageFormatTypeSchema).array().optional(),
  notIn: z.lazy(() => ChatMessageFormatTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => ChatMessageFormatTypeSchema),z.lazy(() => NestedEnumChatMessageFormatTypeFilterSchema) ]).optional(),
}).strict();

export default EnumChatMessageFormatTypeFilterSchema;
