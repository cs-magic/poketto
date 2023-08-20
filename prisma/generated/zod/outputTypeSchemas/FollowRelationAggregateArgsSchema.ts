import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { FollowRelationWhereInputSchema } from '../inputTypeSchemas/FollowRelationWhereInputSchema'
import { FollowRelationOrderByWithRelationInputSchema } from '../inputTypeSchemas/FollowRelationOrderByWithRelationInputSchema'
import { FollowRelationWhereUniqueInputSchema } from '../inputTypeSchemas/FollowRelationWhereUniqueInputSchema'

export const FollowRelationAggregateArgsSchema: z.ZodType<Prisma.FollowRelationAggregateArgs> = z.object({
  where: FollowRelationWhereInputSchema.optional(),
  orderBy: z.union([ FollowRelationOrderByWithRelationInputSchema.array(),FollowRelationOrderByWithRelationInputSchema ]).optional(),
  cursor: FollowRelationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export default FollowRelationAggregateArgsSchema;
