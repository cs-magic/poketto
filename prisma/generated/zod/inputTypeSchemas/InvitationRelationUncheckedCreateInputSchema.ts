import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { InvitationStatusSchema } from './InvitationStatusSchema';

export const InvitationRelationUncheckedCreateInputSchema: z.ZodType<Prisma.InvitationRelationUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  status: z.lazy(() => InvitationStatusSchema).optional(),
  fromId: z.string(),
  toId: z.string().optional().nullable()
}).strict();

export default InvitationRelationUncheckedCreateInputSchema;
