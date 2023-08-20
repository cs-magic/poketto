import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { AppStateCountOrderByAggregateInputSchema } from './AppStateCountOrderByAggregateInputSchema';
import { AppStateAvgOrderByAggregateInputSchema } from './AppStateAvgOrderByAggregateInputSchema';
import { AppStateMaxOrderByAggregateInputSchema } from './AppStateMaxOrderByAggregateInputSchema';
import { AppStateMinOrderByAggregateInputSchema } from './AppStateMinOrderByAggregateInputSchema';
import { AppStateSumOrderByAggregateInputSchema } from './AppStateSumOrderByAggregateInputSchema';

export const AppStateOrderByWithAggregationInputSchema: z.ZodType<Prisma.AppStateOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updatedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  views: z.lazy(() => SortOrderSchema).optional(),
  stars: z.lazy(() => SortOrderSchema).optional(),
  forks: z.lazy(() => SortOrderSchema).optional(),
  tips: z.lazy(() => SortOrderSchema).optional(),
  calls: z.lazy(() => SortOrderSchema).optional(),
  shares: z.lazy(() => SortOrderSchema).optional(),
  appId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => AppStateCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => AppStateAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AppStateMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AppStateMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => AppStateSumOrderByAggregateInputSchema).optional()
}).strict();

export default AppStateOrderByWithAggregationInputSchema;
