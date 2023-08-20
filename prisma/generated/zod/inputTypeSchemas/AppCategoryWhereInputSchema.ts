import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { IntFilterSchema } from './IntFilterSchema';
import { AppListRelationFilterSchema } from './AppListRelationFilterSchema';

export const AppCategoryWhereInputSchema: z.ZodType<Prisma.AppCategoryWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AppCategoryWhereInputSchema),z.lazy(() => AppCategoryWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AppCategoryWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AppCategoryWhereInputSchema),z.lazy(() => AppCategoryWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.date() ]).optional(),
  main: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  sub: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  App: z.lazy(() => AppListRelationFilterSchema).optional()
}).strict();

export default AppCategoryWhereInputSchema;
