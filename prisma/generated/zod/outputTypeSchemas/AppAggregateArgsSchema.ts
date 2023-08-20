import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AppWhereInputSchema } from '../inputTypeSchemas/AppWhereInputSchema'
import { AppOrderByWithRelationInputSchema } from '../inputTypeSchemas/AppOrderByWithRelationInputSchema'
import { AppWhereUniqueInputSchema } from '../inputTypeSchemas/AppWhereUniqueInputSchema'

export const AppAggregateArgsSchema: z.ZodType<Prisma.AppAggregateArgs> = z.object({
  where: AppWhereInputSchema.optional(),
  orderBy: z.union([ AppOrderByWithRelationInputSchema.array(),AppOrderByWithRelationInputSchema ]).optional(),
  cursor: AppWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export default AppAggregateArgsSchema;
