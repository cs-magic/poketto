import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { InvitationStatusSchema } from './InvitationStatusSchema';
import { UserCreateNestedOneWithoutInvitedFromInputSchema } from './UserCreateNestedOneWithoutInvitedFromInputSchema';
import { UserCreateNestedOneWithoutInvitedToInputSchema } from './UserCreateNestedOneWithoutInvitedToInputSchema';

export const InvitationRelationCreateInputSchema: z.ZodType<Prisma.InvitationRelationCreateInput> = z.object({
  id: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  status: z.lazy(() => InvitationStatusSchema).optional(),
  from: z.lazy(() => UserCreateNestedOneWithoutInvitedFromInputSchema).optional(),
  to: z.lazy(() => UserCreateNestedOneWithoutInvitedToInputSchema).optional()
}).strict();

export default InvitationRelationCreateInputSchema;
