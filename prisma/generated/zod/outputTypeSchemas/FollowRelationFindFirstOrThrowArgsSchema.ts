import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { FollowRelationWhereInputSchema } from '../inputTypeSchemas/FollowRelationWhereInputSchema'
import { FollowRelationOrderByWithRelationInputSchema } from '../inputTypeSchemas/FollowRelationOrderByWithRelationInputSchema'
import { FollowRelationWhereUniqueInputSchema } from '../inputTypeSchemas/FollowRelationWhereUniqueInputSchema'
import { FollowRelationScalarFieldEnumSchema } from '../inputTypeSchemas/FollowRelationScalarFieldEnumSchema'

export const FollowRelationFindFirstOrThrowArgsSchema: z.ZodType<Omit<Prisma.FollowRelationFindFirstOrThrowArgs, "select" | "include">> = z.object({
  where: FollowRelationWhereInputSchema.optional(),
  orderBy: z.union([ FollowRelationOrderByWithRelationInputSchema.array(),FollowRelationOrderByWithRelationInputSchema ]).optional(),
  cursor: FollowRelationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FollowRelationScalarFieldEnumSchema,FollowRelationScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export default FollowRelationFindFirstOrThrowArgsSchema;
