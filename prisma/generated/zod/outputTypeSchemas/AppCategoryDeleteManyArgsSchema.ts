import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AppCategoryWhereInputSchema } from '../inputTypeSchemas/AppCategoryWhereInputSchema'

export const AppCategoryDeleteManyArgsSchema: z.ZodType<Prisma.AppCategoryDeleteManyArgs> = z.object({
  where: AppCategoryWhereInputSchema.optional(),
}).strict()

export default AppCategoryDeleteManyArgsSchema;
