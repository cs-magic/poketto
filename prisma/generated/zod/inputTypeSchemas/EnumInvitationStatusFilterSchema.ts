import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { InvitationStatusSchema } from './InvitationStatusSchema';
import { NestedEnumInvitationStatusFilterSchema } from './NestedEnumInvitationStatusFilterSchema';

export const EnumInvitationStatusFilterSchema: z.ZodType<Prisma.EnumInvitationStatusFilter> = z.object({
  equals: z.lazy(() => InvitationStatusSchema).optional(),
  in: z.lazy(() => InvitationStatusSchema).array().optional(),
  notIn: z.lazy(() => InvitationStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => InvitationStatusSchema),z.lazy(() => NestedEnumInvitationStatusFilterSchema) ]).optional(),
}).strict();

export default EnumInvitationStatusFilterSchema;
