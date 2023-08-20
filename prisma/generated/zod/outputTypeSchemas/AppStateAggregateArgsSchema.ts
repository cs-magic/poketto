import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AppStateWhereInputSchema } from '../inputTypeSchemas/AppStateWhereInputSchema'
import { AppStateOrderByWithRelationInputSchema } from '../inputTypeSchemas/AppStateOrderByWithRelationInputSchema'
import { AppStateWhereUniqueInputSchema } from '../inputTypeSchemas/AppStateWhereUniqueInputSchema'

export const AppStateAggregateArgsSchema: z.ZodType<Prisma.AppStateAggregateArgs> = z.object({
  where: AppStateWhereInputSchema.optional(),
  orderBy: z.union([ AppStateOrderByWithRelationInputSchema.array(),AppStateOrderByWithRelationInputSchema ]).optional(),
  cursor: AppStateWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export default AppStateAggregateArgsSchema;
