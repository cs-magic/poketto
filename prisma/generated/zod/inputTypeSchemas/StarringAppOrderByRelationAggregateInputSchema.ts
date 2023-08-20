import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const StarringAppOrderByRelationAggregateInputSchema: z.ZodType<Prisma.StarringAppOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default StarringAppOrderByRelationAggregateInputSchema;
