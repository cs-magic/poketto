import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StarringAppWhereInputSchema } from '../inputTypeSchemas/StarringAppWhereInputSchema'
import { StarringAppOrderByWithAggregationInputSchema } from '../inputTypeSchemas/StarringAppOrderByWithAggregationInputSchema'
import { StarringAppScalarFieldEnumSchema } from '../inputTypeSchemas/StarringAppScalarFieldEnumSchema'
import { StarringAppScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/StarringAppScalarWhereWithAggregatesInputSchema'

export const StarringAppGroupByArgsSchema: z.ZodType<Prisma.StarringAppGroupByArgs> = z.object({
  where: StarringAppWhereInputSchema.optional(),
  orderBy: z.union([ StarringAppOrderByWithAggregationInputSchema.array(),StarringAppOrderByWithAggregationInputSchema ]).optional(),
  by: StarringAppScalarFieldEnumSchema.array(),
  having: StarringAppScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export default StarringAppGroupByArgsSchema;
