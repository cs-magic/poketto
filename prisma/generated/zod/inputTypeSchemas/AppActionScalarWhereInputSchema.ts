import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StringFilterSchema } from './StringFilterSchema';
import { DateTimeNullableFilterSchema } from './DateTimeNullableFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';

export const AppActionScalarWhereInputSchema: z.ZodType<Prisma.AppActionScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AppActionScalarWhereInputSchema),z.lazy(() => AppActionScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AppActionScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AppActionScalarWhereInputSchema),z.lazy(() => AppActionScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.date() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.date() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  appId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  action: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export default AppActionScalarWhereInputSchema;
