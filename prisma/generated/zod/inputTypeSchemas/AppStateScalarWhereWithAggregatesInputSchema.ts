import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StringWithAggregatesFilterSchema } from './StringWithAggregatesFilterSchema';
import { DateTimeNullableWithAggregatesFilterSchema } from './DateTimeNullableWithAggregatesFilterSchema';
import { IntWithAggregatesFilterSchema } from './IntWithAggregatesFilterSchema';
import { FloatWithAggregatesFilterSchema } from './FloatWithAggregatesFilterSchema';

export const AppStateScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AppStateScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AppStateScalarWhereWithAggregatesInputSchema),z.lazy(() => AppStateScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AppStateScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AppStateScalarWhereWithAggregatesInputSchema),z.lazy(() => AppStateScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.date() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.date() ]).optional().nullable(),
  views: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  stars: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  forks: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  tips: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  calls: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  shares: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  appId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export default AppStateScalarWhereWithAggregatesInputSchema;
