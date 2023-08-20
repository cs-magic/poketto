import type { Prisma } from '@prisma/client';
import { z } from 'zod';

export const FollowRelationUncheckedCreateWithoutFromInputSchema: z.ZodType<Prisma.FollowRelationUncheckedCreateWithoutFromInput> = z.object({
  id: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  toId: z.string()
}).strict();

export default FollowRelationUncheckedCreateWithoutFromInputSchema;
