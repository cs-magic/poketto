import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AppCategoryCreateInputSchema } from '../inputTypeSchemas/AppCategoryCreateInputSchema'
import { AppCategoryUncheckedCreateInputSchema } from '../inputTypeSchemas/AppCategoryUncheckedCreateInputSchema'

export const AppCategoryCreateArgsSchema: z.ZodType<Omit<Prisma.AppCategoryCreateArgs, "select" | "include">> = z.object({
  data: z.union([ AppCategoryCreateInputSchema,AppCategoryUncheckedCreateInputSchema ]),
}).strict()

export default AppCategoryCreateArgsSchema;
