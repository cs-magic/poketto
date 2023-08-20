import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const AppStateAvgOrderByAggregateInputSchema: z.ZodType<Prisma.AppStateAvgOrderByAggregateInput> = z.object({
  views: z.lazy(() => SortOrderSchema).optional(),
  stars: z.lazy(() => SortOrderSchema).optional(),
  forks: z.lazy(() => SortOrderSchema).optional(),
  tips: z.lazy(() => SortOrderSchema).optional(),
  calls: z.lazy(() => SortOrderSchema).optional(),
  shares: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default AppStateAvgOrderByAggregateInputSchema;
