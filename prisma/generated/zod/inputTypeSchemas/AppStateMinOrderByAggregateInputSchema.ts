import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const AppStateMinOrderByAggregateInputSchema: z.ZodType<Prisma.AppStateMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  views: z.lazy(() => SortOrderSchema).optional(),
  stars: z.lazy(() => SortOrderSchema).optional(),
  forks: z.lazy(() => SortOrderSchema).optional(),
  tips: z.lazy(() => SortOrderSchema).optional(),
  calls: z.lazy(() => SortOrderSchema).optional(),
  shares: z.lazy(() => SortOrderSchema).optional(),
  appId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default AppStateMinOrderByAggregateInputSchema;
