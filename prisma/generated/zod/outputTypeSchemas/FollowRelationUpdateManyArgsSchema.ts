import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { FollowRelationUpdateManyMutationInputSchema } from '../inputTypeSchemas/FollowRelationUpdateManyMutationInputSchema'
import { FollowRelationUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/FollowRelationUncheckedUpdateManyInputSchema'
import { FollowRelationWhereInputSchema } from '../inputTypeSchemas/FollowRelationWhereInputSchema'

export const FollowRelationUpdateManyArgsSchema: z.ZodType<Prisma.FollowRelationUpdateManyArgs> = z.object({
  data: z.union([ FollowRelationUpdateManyMutationInputSchema,FollowRelationUncheckedUpdateManyInputSchema ]),
  where: FollowRelationWhereInputSchema.optional(),
}).strict()

export default FollowRelationUpdateManyArgsSchema;
