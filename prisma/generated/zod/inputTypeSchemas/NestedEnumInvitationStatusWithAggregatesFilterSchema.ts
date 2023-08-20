import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { InvitationStatusSchema } from './InvitationStatusSchema';
import { NestedIntFilterSchema } from './NestedIntFilterSchema';
import { NestedEnumInvitationStatusFilterSchema } from './NestedEnumInvitationStatusFilterSchema';

export const NestedEnumInvitationStatusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumInvitationStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => InvitationStatusSchema).optional(),
  in: z.lazy(() => InvitationStatusSchema).array().optional(),
  notIn: z.lazy(() => InvitationStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => InvitationStatusSchema),z.lazy(() => NestedEnumInvitationStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumInvitationStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumInvitationStatusFilterSchema).optional()
}).strict();

export default NestedEnumInvitationStatusWithAggregatesFilterSchema;
