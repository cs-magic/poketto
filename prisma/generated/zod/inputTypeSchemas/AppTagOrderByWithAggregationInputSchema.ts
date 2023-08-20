import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { AppTagCountOrderByAggregateInputSchema } from './AppTagCountOrderByAggregateInputSchema';
import { AppTagMaxOrderByAggregateInputSchema } from './AppTagMaxOrderByAggregateInputSchema';
import { AppTagMinOrderByAggregateInputSchema } from './AppTagMinOrderByAggregateInputSchema';

export const AppTagOrderByWithAggregationInputSchema: z.ZodType<Prisma.AppTagOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updatedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  creatorId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => AppTagCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AppTagMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AppTagMinOrderByAggregateInputSchema).optional()
}).strict();

export default AppTagOrderByWithAggregationInputSchema;
