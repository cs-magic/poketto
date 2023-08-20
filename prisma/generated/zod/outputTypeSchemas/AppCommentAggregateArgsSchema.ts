import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AppCommentWhereInputSchema } from '../inputTypeSchemas/AppCommentWhereInputSchema'
import { AppCommentOrderByWithRelationInputSchema } from '../inputTypeSchemas/AppCommentOrderByWithRelationInputSchema'
import { AppCommentWhereUniqueInputSchema } from '../inputTypeSchemas/AppCommentWhereUniqueInputSchema'

export const AppCommentAggregateArgsSchema: z.ZodType<Prisma.AppCommentAggregateArgs> = z.object({
  where: AppCommentWhereInputSchema.optional(),
  orderBy: z.union([ AppCommentOrderByWithRelationInputSchema.array(),AppCommentOrderByWithRelationInputSchema ]).optional(),
  cursor: AppCommentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export default AppCommentAggregateArgsSchema;
