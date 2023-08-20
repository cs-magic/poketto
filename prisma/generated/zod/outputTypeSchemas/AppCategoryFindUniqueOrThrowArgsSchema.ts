import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AppCategoryWhereUniqueInputSchema } from '../inputTypeSchemas/AppCategoryWhereUniqueInputSchema'

export const AppCategoryFindUniqueOrThrowArgsSchema: z.ZodType<Omit<Prisma.AppCategoryFindUniqueOrThrowArgs, "select" | "include">> = z.object({
  where: AppCategoryWhereUniqueInputSchema,
}).strict()

export default AppCategoryFindUniqueOrThrowArgsSchema;
