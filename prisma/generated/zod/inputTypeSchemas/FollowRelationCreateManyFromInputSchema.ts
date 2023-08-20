import type { Prisma } from '@prisma/client';
import { z } from 'zod';

export const FollowRelationCreateManyFromInputSchema: z.ZodType<Prisma.FollowRelationCreateManyFromInput> = z.object({
  id: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  toId: z.string()
}).strict();

export default FollowRelationCreateManyFromInputSchema;
