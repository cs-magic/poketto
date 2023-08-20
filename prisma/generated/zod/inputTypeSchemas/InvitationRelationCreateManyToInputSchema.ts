import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { InvitationStatusSchema } from './InvitationStatusSchema';

export const InvitationRelationCreateManyToInputSchema: z.ZodType<Prisma.InvitationRelationCreateManyToInput> = z.object({
  id: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  status: z.lazy(() => InvitationStatusSchema).optional(),
  fromId: z.string()
}).strict();

export default InvitationRelationCreateManyToInputSchema;
