import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { AppOrderByRelationAggregateInputSchema } from './AppOrderByRelationAggregateInputSchema';

export const AppCategoryOrderByWithRelationInputSchema: z.ZodType<Prisma.AppCategoryOrderByWithRelationInput> = z.object({
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  main: z.lazy(() => SortOrderSchema).optional(),
  sub: z.lazy(() => SortOrderSchema).optional(),
  App: z.lazy(() => AppOrderByRelationAggregateInputSchema).optional()
}).strict();

export default AppCategoryOrderByWithRelationInputSchema;
