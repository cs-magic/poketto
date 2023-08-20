import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StarringAppWhereInputSchema } from '../inputTypeSchemas/StarringAppWhereInputSchema'
import { StarringAppOrderByWithRelationInputSchema } from '../inputTypeSchemas/StarringAppOrderByWithRelationInputSchema'
import { StarringAppWhereUniqueInputSchema } from '../inputTypeSchemas/StarringAppWhereUniqueInputSchema'

export const StarringAppAggregateArgsSchema: z.ZodType<Prisma.StarringAppAggregateArgs> = z.object({
  where: StarringAppWhereInputSchema.optional(),
  orderBy: z.union([ StarringAppOrderByWithRelationInputSchema.array(),StarringAppOrderByWithRelationInputSchema ]).optional(),
  cursor: StarringAppWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export default StarringAppAggregateArgsSchema;
