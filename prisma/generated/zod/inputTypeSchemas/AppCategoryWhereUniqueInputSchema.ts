import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppCategoryIdCompoundUniqueInputSchema } from './AppCategoryIdCompoundUniqueInputSchema';
import { AppCategoryWhereInputSchema } from './AppCategoryWhereInputSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { IntFilterSchema } from './IntFilterSchema';
import { AppListRelationFilterSchema } from './AppListRelationFilterSchema';

export const AppCategoryWhereUniqueInputSchema: z.ZodType<Prisma.AppCategoryWhereUniqueInput> = z.object({
  id: z.lazy(() => AppCategoryIdCompoundUniqueInputSchema)
})
.and(z.object({
  id: z.lazy(() => AppCategoryIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => AppCategoryWhereInputSchema),z.lazy(() => AppCategoryWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AppCategoryWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AppCategoryWhereInputSchema),z.lazy(() => AppCategoryWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.date() ]).optional(),
  main: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  sub: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  App: z.lazy(() => AppListRelationFilterSchema).optional()
}).strict());

export default AppCategoryWhereUniqueInputSchema;
