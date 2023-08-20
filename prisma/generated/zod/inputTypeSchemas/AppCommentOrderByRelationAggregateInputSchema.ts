import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const AppCommentOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AppCommentOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default AppCommentOrderByRelationAggregateInputSchema;
