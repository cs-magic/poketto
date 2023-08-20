import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { AppOrderByWithRelationInputSchema } from './AppOrderByWithRelationInputSchema';

export const AppStateOrderByWithRelationInputSchema: z.ZodType<Prisma.AppStateOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updatedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  views: z.lazy(() => SortOrderSchema).optional(),
  stars: z.lazy(() => SortOrderSchema).optional(),
  forks: z.lazy(() => SortOrderSchema).optional(),
  tips: z.lazy(() => SortOrderSchema).optional(),
  calls: z.lazy(() => SortOrderSchema).optional(),
  shares: z.lazy(() => SortOrderSchema).optional(),
  appId: z.lazy(() => SortOrderSchema).optional(),
  app: z.lazy(() => AppOrderByWithRelationInputSchema).optional()
}).strict();

export default AppStateOrderByWithRelationInputSchema;
