import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { InvitationStatusSchema } from './InvitationStatusSchema';

export const InvitationRelationCreateManyFromInputSchema: z.ZodType<Prisma.InvitationRelationCreateManyFromInput> = z.object({
  id: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  status: z.lazy(() => InvitationStatusSchema).optional(),
  toId: z.string().optional().nullable()
}).strict();

export default InvitationRelationCreateManyFromInputSchema;
