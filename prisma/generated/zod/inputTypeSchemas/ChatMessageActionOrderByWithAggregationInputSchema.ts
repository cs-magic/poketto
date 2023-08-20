import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { ChatMessageActionCountOrderByAggregateInputSchema } from './ChatMessageActionCountOrderByAggregateInputSchema';
import { ChatMessageActionMaxOrderByAggregateInputSchema } from './ChatMessageActionMaxOrderByAggregateInputSchema';
import { ChatMessageActionMinOrderByAggregateInputSchema } from './ChatMessageActionMinOrderByAggregateInputSchema';

export const ChatMessageActionOrderByWithAggregationInputSchema: z.ZodType<Prisma.ChatMessageActionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  messageId: z.lazy(() => SortOrderSchema).optional(),
  action: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ChatMessageActionCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ChatMessageActionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ChatMessageActionMinOrderByAggregateInputSchema).optional()
}).strict();

export default ChatMessageActionOrderByWithAggregationInputSchema;
