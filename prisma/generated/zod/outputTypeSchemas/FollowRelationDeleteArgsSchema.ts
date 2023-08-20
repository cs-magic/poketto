import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { FollowRelationWhereUniqueInputSchema } from '../inputTypeSchemas/FollowRelationWhereUniqueInputSchema'

export const FollowRelationDeleteArgsSchema: z.ZodType<Omit<Prisma.FollowRelationDeleteArgs, "select" | "include">> = z.object({
  where: FollowRelationWhereUniqueInputSchema,
}).strict()

export default FollowRelationDeleteArgsSchema;
