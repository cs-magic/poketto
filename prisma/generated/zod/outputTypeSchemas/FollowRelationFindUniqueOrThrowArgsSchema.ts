import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { FollowRelationWhereUniqueInputSchema } from '../inputTypeSchemas/FollowRelationWhereUniqueInputSchema'

export const FollowRelationFindUniqueOrThrowArgsSchema: z.ZodType<Omit<Prisma.FollowRelationFindUniqueOrThrowArgs, "select" | "include">> = z.object({
  where: FollowRelationWhereUniqueInputSchema,
}).strict()

export default FollowRelationFindUniqueOrThrowArgsSchema;
