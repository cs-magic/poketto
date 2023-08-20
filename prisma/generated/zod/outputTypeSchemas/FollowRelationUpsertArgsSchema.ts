import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { FollowRelationWhereUniqueInputSchema } from '../inputTypeSchemas/FollowRelationWhereUniqueInputSchema'
import { FollowRelationCreateInputSchema } from '../inputTypeSchemas/FollowRelationCreateInputSchema'
import { FollowRelationUncheckedCreateInputSchema } from '../inputTypeSchemas/FollowRelationUncheckedCreateInputSchema'
import { FollowRelationUpdateInputSchema } from '../inputTypeSchemas/FollowRelationUpdateInputSchema'
import { FollowRelationUncheckedUpdateInputSchema } from '../inputTypeSchemas/FollowRelationUncheckedUpdateInputSchema'

export const FollowRelationUpsertArgsSchema: z.ZodType<Omit<Prisma.FollowRelationUpsertArgs, "select" | "include">> = z.object({
  where: FollowRelationWhereUniqueInputSchema,
  create: z.union([ FollowRelationCreateInputSchema,FollowRelationUncheckedCreateInputSchema ]),
  update: z.union([ FollowRelationUpdateInputSchema,FollowRelationUncheckedUpdateInputSchema ]),
}).strict()

export default FollowRelationUpsertArgsSchema;
