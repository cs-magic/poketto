import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ChatMessageFormatTypeSchema } from './ChatMessageFormatTypeSchema';
import { NestedEnumChatMessageFormatTypeWithAggregatesFilterSchema } from './NestedEnumChatMessageFormatTypeWithAggregatesFilterSchema';
import { NestedIntFilterSchema } from './NestedIntFilterSchema';
import { NestedEnumChatMessageFormatTypeFilterSchema } from './NestedEnumChatMessageFormatTypeFilterSchema';

export const EnumChatMessageFormatTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumChatMessageFormatTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => ChatMessageFormatTypeSchema).optional(),
  in: z.lazy(() => ChatMessageFormatTypeSchema).array().optional(),
  notIn: z.lazy(() => ChatMessageFormatTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => ChatMessageFormatTypeSchema),z.lazy(() => NestedEnumChatMessageFormatTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumChatMessageFormatTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumChatMessageFormatTypeFilterSchema).optional()
}).strict();

export default EnumChatMessageFormatTypeWithAggregatesFilterSchema;
