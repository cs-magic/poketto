import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AppCategoryWhereUniqueInputSchema } from '../inputTypeSchemas/AppCategoryWhereUniqueInputSchema'

export const AppCategoryFindUniqueArgsSchema: z.ZodType<Omit<Prisma.AppCategoryFindUniqueArgs, "select" | "include">> = z.object({
  where: AppCategoryWhereUniqueInputSchema,
}).strict()

export default AppCategoryFindUniqueArgsSchema;
