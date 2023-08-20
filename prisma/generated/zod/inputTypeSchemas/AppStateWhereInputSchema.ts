import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StringFilterSchema } from './StringFilterSchema';
import { DateTimeNullableFilterSchema } from './DateTimeNullableFilterSchema';
import { IntFilterSchema } from './IntFilterSchema';
import { FloatFilterSchema } from './FloatFilterSchema';
import { AppRelationFilterSchema } from './AppRelationFilterSchema';
import { AppWhereInputSchema } from './AppWhereInputSchema';

export const AppStateWhereInputSchema: z.ZodType<Prisma.AppStateWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AppStateWhereInputSchema),z.lazy(() => AppStateWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AppStateWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AppStateWhereInputSchema),z.lazy(() => AppStateWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.date() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.date() ]).optional().nullable(),
  views: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  stars: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  forks: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  tips: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  calls: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  shares: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  appId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  app: z.union([ z.lazy(() => AppRelationFilterSchema),z.lazy(() => AppWhereInputSchema) ]).optional(),
}).strict();

export default AppStateWhereInputSchema;
