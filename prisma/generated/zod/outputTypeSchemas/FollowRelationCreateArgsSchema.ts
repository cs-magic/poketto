import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { FollowRelationCreateInputSchema } from '../inputTypeSchemas/FollowRelationCreateInputSchema'
import { FollowRelationUncheckedCreateInputSchema } from '../inputTypeSchemas/FollowRelationUncheckedCreateInputSchema'

export const FollowRelationCreateArgsSchema: z.ZodType<Omit<Prisma.FollowRelationCreateArgs, "select" | "include">> = z.object({
  data: z.union([ FollowRelationCreateInputSchema,FollowRelationUncheckedCreateInputSchema ]),
}).strict()

export default FollowRelationCreateArgsSchema;
