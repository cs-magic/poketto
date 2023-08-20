import type { Prisma } from '@prisma/client';
import { z } from 'zod';

export const FollowRelationCreateManyInputSchema: z.ZodType<Prisma.FollowRelationCreateManyInput> = z.object({
  id: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  fromId: z.string(),
  toId: z.string()
}).strict();

export default FollowRelationCreateManyInputSchema;
