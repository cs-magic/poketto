import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { InvitationStatusSchema } from './InvitationStatusSchema';
import { UserCreateNestedOneWithoutInvitedFromInputSchema } from './UserCreateNestedOneWithoutInvitedFromInputSchema';

export const InvitationRelationCreateWithoutToInputSchema: z.ZodType<Prisma.InvitationRelationCreateWithoutToInput> = z.object({
  id: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  status: z.lazy(() => InvitationStatusSchema).optional(),
  from: z.lazy(() => UserCreateNestedOneWithoutInvitedFromInputSchema).optional()
}).strict();

export default InvitationRelationCreateWithoutToInputSchema;
