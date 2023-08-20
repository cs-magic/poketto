import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AppCategoryUpdateInputSchema } from '../inputTypeSchemas/AppCategoryUpdateInputSchema'
import { AppCategoryUncheckedUpdateInputSchema } from '../inputTypeSchemas/AppCategoryUncheckedUpdateInputSchema'
import { AppCategoryWhereUniqueInputSchema } from '../inputTypeSchemas/AppCategoryWhereUniqueInputSchema'

export const AppCategoryUpdateArgsSchema: z.ZodType<Omit<Prisma.AppCategoryUpdateArgs, "select" | "include">> = z.object({
  data: z.union([ AppCategoryUpdateInputSchema,AppCategoryUncheckedUpdateInputSchema ]),
  where: AppCategoryWhereUniqueInputSchema,
}).strict()

export default AppCategoryUpdateArgsSchema;
