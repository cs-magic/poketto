import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { FollowRelationCreateManyInputSchema } from '../inputTypeSchemas/FollowRelationCreateManyInputSchema'

export const FollowRelationCreateManyArgsSchema: z.ZodType<Prisma.FollowRelationCreateManyArgs> = z.object({
  data: z.union([ FollowRelationCreateManyInputSchema,FollowRelationCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export default FollowRelationCreateManyArgsSchema;
