import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { AppCommentCountOrderByAggregateInputSchema } from './AppCommentCountOrderByAggregateInputSchema';
import { AppCommentAvgOrderByAggregateInputSchema } from './AppCommentAvgOrderByAggregateInputSchema';
import { AppCommentMaxOrderByAggregateInputSchema } from './AppCommentMaxOrderByAggregateInputSchema';
import { AppCommentMinOrderByAggregateInputSchema } from './AppCommentMinOrderByAggregateInputSchema';
import { AppCommentSumOrderByAggregateInputSchema } from './AppCommentSumOrderByAggregateInputSchema';

export const AppCommentOrderByWithAggregationInputSchema: z.ZodType<Prisma.AppCommentOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  appId: z.lazy(() => SortOrderSchema).optional(),
  title: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  rate: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => AppCommentCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => AppCommentAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AppCommentMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AppCommentMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => AppCommentSumOrderByAggregateInputSchema).optional()
}).strict();

export default AppCommentOrderByWithAggregationInputSchema;
