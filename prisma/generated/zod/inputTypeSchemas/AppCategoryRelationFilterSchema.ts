import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppCategoryWhereInputSchema } from './AppCategoryWhereInputSchema';

export const AppCategoryRelationFilterSchema: z.ZodType<Prisma.AppCategoryRelationFilter> = z.object({
  is: z.lazy(() => AppCategoryWhereInputSchema).optional(),
  isNot: z.lazy(() => AppCategoryWhereInputSchema).optional()
}).strict();

export default AppCategoryRelationFilterSchema;
