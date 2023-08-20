import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AppActionWhereInputSchema } from '../inputTypeSchemas/AppActionWhereInputSchema'
import { AppActionOrderByWithRelationInputSchema } from '../inputTypeSchemas/AppActionOrderByWithRelationInputSchema'
import { AppActionWhereUniqueInputSchema } from '../inputTypeSchemas/AppActionWhereUniqueInputSchema'

export const AppActionAggregateArgsSchema: z.ZodType<Prisma.AppActionAggregateArgs> = z.object({
  where: AppActionWhereInputSchema.optional(),
  orderBy: z.union([ AppActionOrderByWithRelationInputSchema.array(),AppActionOrderByWithRelationInputSchema ]).optional(),
  cursor: AppActionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export default AppActionAggregateArgsSchema;
