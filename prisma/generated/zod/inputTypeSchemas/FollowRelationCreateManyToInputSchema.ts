import type { Prisma } from '@prisma/client';
import { z } from 'zod';

export const FollowRelationCreateManyToInputSchema: z.ZodType<Prisma.FollowRelationCreateManyToInput> = z.object({
  id: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  fromId: z.string()
}).strict();

export default FollowRelationCreateManyToInputSchema;
