import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const AppCountOrderByAggregateInputSchema: z.ZodType<Prisma.AppCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  platformType: z.lazy(() => SortOrderSchema).optional(),
  platformId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  creatorId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  avatar: z.lazy(() => SortOrderSchema).optional(),
  desc: z.lazy(() => SortOrderSchema).optional(),
  language: z.lazy(() => SortOrderSchema).optional(),
  version: z.lazy(() => SortOrderSchema).optional(),
  categoryMain: z.lazy(() => SortOrderSchema).optional(),
  categorySub: z.lazy(() => SortOrderSchema).optional(),
  modelName: z.lazy(() => SortOrderSchema).optional(),
  isOpenSource: z.lazy(() => SortOrderSchema).optional(),
  modelArgs: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default AppCountOrderByAggregateInputSchema;
