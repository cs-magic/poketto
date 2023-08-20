import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StringFilterSchema } from './StringFilterSchema';
import { DateTimeNullableFilterSchema } from './DateTimeNullableFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';

export const AppTagScalarWhereInputSchema: z.ZodType<Prisma.AppTagScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AppTagScalarWhereInputSchema),z.lazy(() => AppTagScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AppTagScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AppTagScalarWhereInputSchema),z.lazy(() => AppTagScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.date() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.date() ]).optional().nullable(),
  creatorId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export default AppTagScalarWhereInputSchema;
