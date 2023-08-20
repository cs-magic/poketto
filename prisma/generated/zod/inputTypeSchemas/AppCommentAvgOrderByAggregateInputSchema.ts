import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const AppCommentAvgOrderByAggregateInputSchema: z.ZodType<Prisma.AppCommentAvgOrderByAggregateInput> = z.object({
  rate: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default AppCommentAvgOrderByAggregateInputSchema;
