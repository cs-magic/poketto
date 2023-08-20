import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const AppTagOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AppTagOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default AppTagOrderByRelationAggregateInputSchema;
