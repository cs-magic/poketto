import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AppTagWhereInputSchema } from '../inputTypeSchemas/AppTagWhereInputSchema'
import { AppTagOrderByWithRelationInputSchema } from '../inputTypeSchemas/AppTagOrderByWithRelationInputSchema'
import { AppTagWhereUniqueInputSchema } from '../inputTypeSchemas/AppTagWhereUniqueInputSchema'

export const AppTagAggregateArgsSchema: z.ZodType<Prisma.AppTagAggregateArgs> = z.object({
  where: AppTagWhereInputSchema.optional(),
  orderBy: z.union([ AppTagOrderByWithRelationInputSchema.array(),AppTagOrderByWithRelationInputSchema ]).optional(),
  cursor: AppTagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export default AppTagAggregateArgsSchema;
