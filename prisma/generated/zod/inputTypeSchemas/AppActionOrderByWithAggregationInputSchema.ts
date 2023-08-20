import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { AppActionCountOrderByAggregateInputSchema } from './AppActionCountOrderByAggregateInputSchema';
import { AppActionMaxOrderByAggregateInputSchema } from './AppActionMaxOrderByAggregateInputSchema';
import { AppActionMinOrderByAggregateInputSchema } from './AppActionMinOrderByAggregateInputSchema';

export const AppActionOrderByWithAggregationInputSchema: z.ZodType<Prisma.AppActionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updatedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  userId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  appId: z.lazy(() => SortOrderSchema).optional(),
  action: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => AppActionCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AppActionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AppActionMinOrderByAggregateInputSchema).optional()
}).strict();

export default AppActionOrderByWithAggregationInputSchema;
