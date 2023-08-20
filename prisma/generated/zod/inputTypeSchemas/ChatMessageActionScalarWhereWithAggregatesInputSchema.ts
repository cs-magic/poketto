import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StringWithAggregatesFilterSchema } from './StringWithAggregatesFilterSchema';
import { DateTimeWithAggregatesFilterSchema } from './DateTimeWithAggregatesFilterSchema';

export const ChatMessageActionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ChatMessageActionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ChatMessageActionScalarWhereWithAggregatesInputSchema),z.lazy(() => ChatMessageActionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ChatMessageActionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ChatMessageActionScalarWhereWithAggregatesInputSchema),z.lazy(() => ChatMessageActionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  messageId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  action: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export default ChatMessageActionScalarWhereWithAggregatesInputSchema;
