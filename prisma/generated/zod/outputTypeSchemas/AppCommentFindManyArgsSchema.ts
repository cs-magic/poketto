import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AppCommentWhereInputSchema } from '../inputTypeSchemas/AppCommentWhereInputSchema'
import { AppCommentOrderByWithRelationInputSchema } from '../inputTypeSchemas/AppCommentOrderByWithRelationInputSchema'
import { AppCommentWhereUniqueInputSchema } from '../inputTypeSchemas/AppCommentWhereUniqueInputSchema'
import { AppCommentScalarFieldEnumSchema } from '../inputTypeSchemas/AppCommentScalarFieldEnumSchema'

export const AppCommentFindManyArgsSchema: z.ZodType<Omit<Prisma.AppCommentFindManyArgs, "select" | "include">> = z.object({
  where: AppCommentWhereInputSchema.optional(),
  orderBy: z.union([ AppCommentOrderByWithRelationInputSchema.array(),AppCommentOrderByWithRelationInputSchema ]).optional(),
  cursor: AppCommentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AppCommentScalarFieldEnumSchema,AppCommentScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export default AppCommentFindManyArgsSchema;
