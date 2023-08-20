import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { AppCategoryCountOrderByAggregateInputSchema } from './AppCategoryCountOrderByAggregateInputSchema';
import { AppCategoryAvgOrderByAggregateInputSchema } from './AppCategoryAvgOrderByAggregateInputSchema';
import { AppCategoryMaxOrderByAggregateInputSchema } from './AppCategoryMaxOrderByAggregateInputSchema';
import { AppCategoryMinOrderByAggregateInputSchema } from './AppCategoryMinOrderByAggregateInputSchema';
import { AppCategorySumOrderByAggregateInputSchema } from './AppCategorySumOrderByAggregateInputSchema';

export const AppCategoryOrderByWithAggregationInputSchema: z.ZodType<Prisma.AppCategoryOrderByWithAggregationInput> = z.object({
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  main: z.lazy(() => SortOrderSchema).optional(),
  sub: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => AppCategoryCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => AppCategoryAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AppCategoryMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AppCategoryMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => AppCategorySumOrderByAggregateInputSchema).optional()
}).strict();

export default AppCategoryOrderByWithAggregationInputSchema;
