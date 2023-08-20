import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AppCategoryWhereUniqueInputSchema } from '../inputTypeSchemas/AppCategoryWhereUniqueInputSchema'
import { AppCategoryCreateInputSchema } from '../inputTypeSchemas/AppCategoryCreateInputSchema'
import { AppCategoryUncheckedCreateInputSchema } from '../inputTypeSchemas/AppCategoryUncheckedCreateInputSchema'
import { AppCategoryUpdateInputSchema } from '../inputTypeSchemas/AppCategoryUpdateInputSchema'
import { AppCategoryUncheckedUpdateInputSchema } from '../inputTypeSchemas/AppCategoryUncheckedUpdateInputSchema'

export const AppCategoryUpsertArgsSchema: z.ZodType<Omit<Prisma.AppCategoryUpsertArgs, "select" | "include">> = z.object({
  where: AppCategoryWhereUniqueInputSchema,
  create: z.union([ AppCategoryCreateInputSchema,AppCategoryUncheckedCreateInputSchema ]),
  update: z.union([ AppCategoryUpdateInputSchema,AppCategoryUncheckedUpdateInputSchema ]),
}).strict()

export default AppCategoryUpsertArgsSchema;
