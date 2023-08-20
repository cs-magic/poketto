import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AppCommentWhereInputSchema } from '../inputTypeSchemas/AppCommentWhereInputSchema'
import { AppCommentOrderByWithAggregationInputSchema } from '../inputTypeSchemas/AppCommentOrderByWithAggregationInputSchema'
import { AppCommentScalarFieldEnumSchema } from '../inputTypeSchemas/AppCommentScalarFieldEnumSchema'
import { AppCommentScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/AppCommentScalarWhereWithAggregatesInputSchema'

export const AppCommentGroupByArgsSchema: z.ZodType<Prisma.AppCommentGroupByArgs> = z.object({
  where: AppCommentWhereInputSchema.optional(),
  orderBy: z.union([ AppCommentOrderByWithAggregationInputSchema.array(),AppCommentOrderByWithAggregationInputSchema ]).optional(),
  by: AppCommentScalarFieldEnumSchema.array(),
  having: AppCommentScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export default AppCommentGroupByArgsSchema;
