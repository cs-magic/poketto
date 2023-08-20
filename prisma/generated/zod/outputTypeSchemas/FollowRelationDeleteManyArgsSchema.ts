import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { FollowRelationWhereInputSchema } from '../inputTypeSchemas/FollowRelationWhereInputSchema'

export const FollowRelationDeleteManyArgsSchema: z.ZodType<Prisma.FollowRelationDeleteManyArgs> = z.object({
  where: FollowRelationWhereInputSchema.optional(),
}).strict()

export default FollowRelationDeleteManyArgsSchema;
