import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { DateTimeFieldUpdateOperationsInputSchema } from './DateTimeFieldUpdateOperationsInputSchema';
import { InvitationStatusSchema } from './InvitationStatusSchema';
import { EnumInvitationStatusFieldUpdateOperationsInputSchema } from './EnumInvitationStatusFieldUpdateOperationsInputSchema';
import { UserUpdateOneWithoutInvitedFromNestedInputSchema } from './UserUpdateOneWithoutInvitedFromNestedInputSchema';

export const InvitationRelationUpdateWithoutToInputSchema: z.ZodType<Prisma.InvitationRelationUpdateWithoutToInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => InvitationStatusSchema),z.lazy(() => EnumInvitationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  from: z.lazy(() => UserUpdateOneWithoutInvitedFromNestedInputSchema).optional()
}).strict();

export default InvitationRelationUpdateWithoutToInputSchema;
