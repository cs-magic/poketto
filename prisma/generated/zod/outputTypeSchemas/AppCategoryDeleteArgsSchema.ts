import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AppCategoryWhereUniqueInputSchema } from '../inputTypeSchemas/AppCategoryWhereUniqueInputSchema'

export const AppCategoryDeleteArgsSchema: z.ZodType<Omit<Prisma.AppCategoryDeleteArgs, "select" | "include">> = z.object({
  where: AppCategoryWhereUniqueInputSchema,
}).strict()

export default AppCategoryDeleteArgsSchema;
