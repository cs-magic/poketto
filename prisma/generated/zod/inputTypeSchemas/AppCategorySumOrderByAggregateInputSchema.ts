import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const AppCategorySumOrderByAggregateInputSchema: z.ZodType<Prisma.AppCategorySumOrderByAggregateInput> = z.object({
  main: z.lazy(() => SortOrderSchema).optional(),
  sub: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default AppCategorySumOrderByAggregateInputSchema;
