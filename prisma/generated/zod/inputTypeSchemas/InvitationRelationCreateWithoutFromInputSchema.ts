import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { InvitationStatusSchema } from './InvitationStatusSchema';
import { UserCreateNestedOneWithoutInvitedToInputSchema } from './UserCreateNestedOneWithoutInvitedToInputSchema';

export const InvitationRelationCreateWithoutFromInputSchema: z.ZodType<Prisma.InvitationRelationCreateWithoutFromInput> = z.object({
  id: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  status: z.lazy(() => InvitationStatusSchema).optional(),
  to: z.lazy(() => UserCreateNestedOneWithoutInvitedToInputSchema).optional()
}).strict();

export default InvitationRelationCreateWithoutFromInputSchema;
