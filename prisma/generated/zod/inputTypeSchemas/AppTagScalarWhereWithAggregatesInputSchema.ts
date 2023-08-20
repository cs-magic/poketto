import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StringWithAggregatesFilterSchema } from './StringWithAggregatesFilterSchema';
import { DateTimeNullableWithAggregatesFilterSchema } from './DateTimeNullableWithAggregatesFilterSchema';
import { StringNullableWithAggregatesFilterSchema } from './StringNullableWithAggregatesFilterSchema';

export const AppTagScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AppTagScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AppTagScalarWhereWithAggregatesInputSchema),z.lazy(() => AppTagScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AppTagScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AppTagScalarWhereWithAggregatesInputSchema),z.lazy(() => AppTagScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.date() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.date() ]).optional().nullable(),
  creatorId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export default AppTagScalarWhereWithAggregatesInputSchema;
