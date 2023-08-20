import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { InvitationRelationWhereInputSchema } from './InvitationRelationWhereInputSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { EnumInvitationStatusFilterSchema } from './EnumInvitationStatusFilterSchema';
import { InvitationStatusSchema } from './InvitationStatusSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { UserNullableRelationFilterSchema } from './UserNullableRelationFilterSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';

export const InvitationRelationWhereUniqueInputSchema: z.ZodType<Prisma.InvitationRelationWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    toId: z.string()
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    toId: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  toId: z.string().optional(),
  AND: z.union([ z.lazy(() => InvitationRelationWhereInputSchema),z.lazy(() => InvitationRelationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => InvitationRelationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => InvitationRelationWhereInputSchema),z.lazy(() => InvitationRelationWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.date() ]).optional(),
  status: z.union([ z.lazy(() => EnumInvitationStatusFilterSchema),z.lazy(() => InvitationStatusSchema) ]).optional(),
  fromId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  from: z.union([ z.lazy(() => UserNullableRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
  to: z.union([ z.lazy(() => UserNullableRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
}).strict());

export default InvitationRelationWhereUniqueInputSchema;
