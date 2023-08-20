import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AppCategoryWhereInputSchema } from '../inputTypeSchemas/AppCategoryWhereInputSchema'
import { AppCategoryOrderByWithRelationInputSchema } from '../inputTypeSchemas/AppCategoryOrderByWithRelationInputSchema'
import { AppCategoryWhereUniqueInputSchema } from '../inputTypeSchemas/AppCategoryWhereUniqueInputSchema'

export const AppCategoryAggregateArgsSchema: z.ZodType<Prisma.AppCategoryAggregateArgs> = z.object({
  where: AppCategoryWhereInputSchema.optional(),
  orderBy: z.union([ AppCategoryOrderByWithRelationInputSchema.array(),AppCategoryOrderByWithRelationInputSchema ]).optional(),
  cursor: AppCategoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export default AppCategoryAggregateArgsSchema;
