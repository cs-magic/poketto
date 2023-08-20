import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StringFilterSchema } from './StringFilterSchema';
import { DateTimeNullableFilterSchema } from './DateTimeNullableFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { UserNullableRelationFilterSchema } from './UserNullableRelationFilterSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';
import { AppRelationFilterSchema } from './AppRelationFilterSchema';
import { AppWhereInputSchema } from './AppWhereInputSchema';

export const AppActionWhereInputSchema: z.ZodType<Prisma.AppActionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AppActionWhereInputSchema),z.lazy(() => AppActionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AppActionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AppActionWhereInputSchema),z.lazy(() => AppActionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.date() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.date() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  appId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  action: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserNullableRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
  app: z.union([ z.lazy(() => AppRelationFilterSchema),z.lazy(() => AppWhereInputSchema) ]).optional(),
}).strict();

export default AppActionWhereInputSchema;
