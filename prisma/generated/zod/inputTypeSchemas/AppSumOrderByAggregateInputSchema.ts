import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const AppSumOrderByAggregateInputSchema: z.ZodType<Prisma.AppSumOrderByAggregateInput> = z.object({
  categoryMain: z.lazy(() => SortOrderSchema).optional(),
  categorySub: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default AppSumOrderByAggregateInputSchema;
