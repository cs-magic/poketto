import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AppCategoryWhereInputSchema } from '../inputTypeSchemas/AppCategoryWhereInputSchema'
import { AppCategoryOrderByWithRelationInputSchema } from '../inputTypeSchemas/AppCategoryOrderByWithRelationInputSchema'
import { AppCategoryWhereUniqueInputSchema } from '../inputTypeSchemas/AppCategoryWhereUniqueInputSchema'
import { AppCategoryScalarFieldEnumSchema } from '../inputTypeSchemas/AppCategoryScalarFieldEnumSchema'

export const AppCategoryFindFirstOrThrowArgsSchema: z.ZodType<Omit<Prisma.AppCategoryFindFirstOrThrowArgs, "select" | "include">> = z.object({
  where: AppCategoryWhereInputSchema.optional(),
  orderBy: z.union([ AppCategoryOrderByWithRelationInputSchema.array(),AppCategoryOrderByWithRelationInputSchema ]).optional(),
  cursor: AppCategoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AppCategoryScalarFieldEnumSchema,AppCategoryScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export default AppCategoryFindFirstOrThrowArgsSchema;
