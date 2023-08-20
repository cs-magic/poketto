import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { FollowRelationWhereUniqueInputSchema } from '../inputTypeSchemas/FollowRelationWhereUniqueInputSchema'

export const FollowRelationFindUniqueArgsSchema: z.ZodType<Omit<Prisma.FollowRelationFindUniqueArgs, "select" | "include">> = z.object({
  where: FollowRelationWhereUniqueInputSchema,
}).strict()

export default FollowRelationFindUniqueArgsSchema;
