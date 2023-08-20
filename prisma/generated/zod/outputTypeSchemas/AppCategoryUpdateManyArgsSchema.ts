import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AppCategoryUpdateManyMutationInputSchema } from '../inputTypeSchemas/AppCategoryUpdateManyMutationInputSchema'
import { AppCategoryUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/AppCategoryUncheckedUpdateManyInputSchema'
import { AppCategoryWhereInputSchema } from '../inputTypeSchemas/AppCategoryWhereInputSchema'

export const AppCategoryUpdateManyArgsSchema: z.ZodType<Prisma.AppCategoryUpdateManyArgs> = z.object({
  data: z.union([ AppCategoryUpdateManyMutationInputSchema,AppCategoryUncheckedUpdateManyInputSchema ]),
  where: AppCategoryWhereInputSchema.optional(),
}).strict()

export default AppCategoryUpdateManyArgsSchema;
