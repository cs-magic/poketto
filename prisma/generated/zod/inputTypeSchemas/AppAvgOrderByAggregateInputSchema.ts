import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const AppAvgOrderByAggregateInputSchema: z.ZodType<Prisma.AppAvgOrderByAggregateInput> = z.object({
  categoryMain: z.lazy(() => SortOrderSchema).optional(),
  categorySub: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default AppAvgOrderByAggregateInputSchema;
