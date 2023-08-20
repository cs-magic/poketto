import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppTagWhereInputSchema } from './AppTagWhereInputSchema';
import { DateTimeNullableFilterSchema } from './DateTimeNullableFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { UserNullableRelationFilterSchema } from './UserNullableRelationFilterSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';
import { AppListRelationFilterSchema } from './AppListRelationFilterSchema';

export const AppTagWhereUniqueInputSchema: z.ZodType<Prisma.AppTagWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => AppTagWhereInputSchema),z.lazy(() => AppTagWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AppTagWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AppTagWhereInputSchema),z.lazy(() => AppTagWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.date() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.date() ]).optional().nullable(),
  creatorId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  creator: z.union([ z.lazy(() => UserNullableRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
  apps: z.lazy(() => AppListRelationFilterSchema).optional()
}).strict());

export default AppTagWhereUniqueInputSchema;
