import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AppCategoryWhereInputSchema } from '../inputTypeSchemas/AppCategoryWhereInputSchema'
import { AppCategoryOrderByWithAggregationInputSchema } from '../inputTypeSchemas/AppCategoryOrderByWithAggregationInputSchema'
import { AppCategoryScalarFieldEnumSchema } from '../inputTypeSchemas/AppCategoryScalarFieldEnumSchema'
import { AppCategoryScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/AppCategoryScalarWhereWithAggregatesInputSchema'

export const AppCategoryGroupByArgsSchema: z.ZodType<Prisma.AppCategoryGroupByArgs> = z.object({
  where: AppCategoryWhereInputSchema.optional(),
  orderBy: z.union([ AppCategoryOrderByWithAggregationInputSchema.array(),AppCategoryOrderByWithAggregationInputSchema ]).optional(),
  by: AppCategoryScalarFieldEnumSchema.array(),
  having: AppCategoryScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export default AppCategoryGroupByArgsSchema;
