import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { InvitationStatusSchema } from './InvitationStatusSchema';

export const EnumInvitationStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumInvitationStatusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => InvitationStatusSchema).optional()
}).strict();

export default EnumInvitationStatusFieldUpdateOperationsInputSchema;
