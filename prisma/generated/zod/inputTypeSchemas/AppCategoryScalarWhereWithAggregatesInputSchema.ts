import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { DateTimeWithAggregatesFilterSchema } from './DateTimeWithAggregatesFilterSchema';
import { IntWithAggregatesFilterSchema } from './IntWithAggregatesFilterSchema';

export const AppCategoryScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AppCategoryScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AppCategoryScalarWhereWithAggregatesInputSchema),z.lazy(() => AppCategoryScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AppCategoryScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AppCategoryScalarWhereWithAggregatesInputSchema),z.lazy(() => AppCategoryScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.date() ]).optional(),
  main: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  sub: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export default AppCategoryScalarWhereWithAggregatesInputSchema;
