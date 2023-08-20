import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { StarringAppCountOrderByAggregateInputSchema } from './StarringAppCountOrderByAggregateInputSchema';
import { StarringAppMaxOrderByAggregateInputSchema } from './StarringAppMaxOrderByAggregateInputSchema';
import { StarringAppMinOrderByAggregateInputSchema } from './StarringAppMinOrderByAggregateInputSchema';

export const StarringAppOrderByWithAggregationInputSchema: z.ZodType<Prisma.StarringAppOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  appId: z.lazy(() => SortOrderSchema).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => StarringAppCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => StarringAppMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => StarringAppMinOrderByAggregateInputSchema).optional()
}).strict();

export default StarringAppOrderByWithAggregationInputSchema;
