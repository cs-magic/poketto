import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const AppCommentSumOrderByAggregateInputSchema: z.ZodType<Prisma.AppCommentSumOrderByAggregateInput> = z.object({
  rate: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default AppCommentSumOrderByAggregateInputSchema;
