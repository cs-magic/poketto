import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { DateTimeFieldUpdateOperationsInputSchema } from './DateTimeFieldUpdateOperationsInputSchema';
import { InvitationStatusSchema } from './InvitationStatusSchema';
import { EnumInvitationStatusFieldUpdateOperationsInputSchema } from './EnumInvitationStatusFieldUpdateOperationsInputSchema';
import { UserUpdateOneWithoutInvitedToNestedInputSchema } from './UserUpdateOneWithoutInvitedToNestedInputSchema';

export const InvitationRelationUpdateWithoutFromInputSchema: z.ZodType<Prisma.InvitationRelationUpdateWithoutFromInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => InvitationStatusSchema),z.lazy(() => EnumInvitationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  to: z.lazy(() => UserUpdateOneWithoutInvitedToNestedInputSchema).optional()
}).strict();

export default InvitationRelationUpdateWithoutFromInputSchema;
