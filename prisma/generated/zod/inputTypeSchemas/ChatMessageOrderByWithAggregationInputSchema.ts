import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { ChatMessageCountOrderByAggregateInputSchema } from './ChatMessageCountOrderByAggregateInputSchema';
import { ChatMessageMaxOrderByAggregateInputSchema } from './ChatMessageMaxOrderByAggregateInputSchema';
import { ChatMessageMinOrderByAggregateInputSchema } from './ChatMessageMinOrderByAggregateInputSchema';

export const ChatMessageOrderByWithAggregationInputSchema: z.ZodType<Prisma.ChatMessageOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  format: z.lazy(() => SortOrderSchema).optional(),
  conversationId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ChatMessageCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ChatMessageMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ChatMessageMinOrderByAggregateInputSchema).optional()
}).strict();

export default ChatMessageOrderByWithAggregationInputSchema;
