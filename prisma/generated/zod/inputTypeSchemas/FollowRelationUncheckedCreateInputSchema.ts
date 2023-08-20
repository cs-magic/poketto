import type { Prisma } from '@prisma/client';
import { z } from 'zod';

export const FollowRelationUncheckedCreateInputSchema: z.ZodType<Prisma.FollowRelationUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  fromId: z.string(),
  toId: z.string()
}).strict();

export default FollowRelationUncheckedCreateInputSchema;
