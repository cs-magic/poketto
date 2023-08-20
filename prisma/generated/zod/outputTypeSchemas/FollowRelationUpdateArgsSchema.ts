import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { FollowRelationUpdateInputSchema } from '../inputTypeSchemas/FollowRelationUpdateInputSchema'
import { FollowRelationUncheckedUpdateInputSchema } from '../inputTypeSchemas/FollowRelationUncheckedUpdateInputSchema'
import { FollowRelationWhereUniqueInputSchema } from '../inputTypeSchemas/FollowRelationWhereUniqueInputSchema'

export const FollowRelationUpdateArgsSchema: z.ZodType<Omit<Prisma.FollowRelationUpdateArgs, "select" | "include">> = z.object({
  data: z.union([ FollowRelationUpdateInputSchema,FollowRelationUncheckedUpdateInputSchema ]),
  where: FollowRelationWhereUniqueInputSchema,
}).strict()

export default FollowRelationUpdateArgsSchema;
