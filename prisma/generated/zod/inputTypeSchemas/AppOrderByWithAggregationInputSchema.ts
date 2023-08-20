import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { AppCountOrderByAggregateInputSchema } from './AppCountOrderByAggregateInputSchema';
import { AppAvgOrderByAggregateInputSchema } from './AppAvgOrderByAggregateInputSchema';
import { AppMaxOrderByAggregateInputSchema } from './AppMaxOrderByAggregateInputSchema';
import { AppMinOrderByAggregateInputSchema } from './AppMinOrderByAggregateInputSchema';
import { AppSumOrderByAggregateInputSchema } from './AppSumOrderByAggregateInputSchema';

export const AppOrderByWithAggregationInputSchema: z.ZodType<Prisma.AppOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  platformType: z.lazy(() => SortOrderSchema).optional(),
  platformId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  creatorId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  avatar: z.lazy(() => SortOrderSchema).optional(),
  desc: z.lazy(() => SortOrderSchema).optional(),
  language: z.lazy(() => SortOrderSchema).optional(),
  version: z.lazy(() => SortOrderSchema).optional(),
  categoryMain: z.lazy(() => SortOrderSchema).optional(),
  categorySub: z.lazy(() => SortOrderSchema).optional(),
  modelName: z.lazy(() => SortOrderSchema).optional(),
  isOpenSource: z.lazy(() => SortOrderSchema).optional(),
  modelArgs: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => AppCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => AppAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AppMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AppMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => AppSumOrderByAggregateInputSchema).optional()
}).strict();

export default AppOrderByWithAggregationInputSchema;
