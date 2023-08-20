import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { FollowRelationWhereInputSchema } from '../inputTypeSchemas/FollowRelationWhereInputSchema'
import { FollowRelationOrderByWithAggregationInputSchema } from '../inputTypeSchemas/FollowRelationOrderByWithAggregationInputSchema'
import { FollowRelationScalarFieldEnumSchema } from '../inputTypeSchemas/FollowRelationScalarFieldEnumSchema'
import { FollowRelationScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/FollowRelationScalarWhereWithAggregatesInputSchema'

export const FollowRelationGroupByArgsSchema: z.ZodType<Prisma.FollowRelationGroupByArgs> = z.object({
  where: FollowRelationWhereInputSchema.optional(),
  orderBy: z.union([ FollowRelationOrderByWithAggregationInputSchema.array(),FollowRelationOrderByWithAggregationInputSchema ]).optional(),
  by: FollowRelationScalarFieldEnumSchema.array(),
  having: FollowRelationScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export default FollowRelationGroupByArgsSchema;
