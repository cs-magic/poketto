import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StringFilterSchema } from './StringFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { EnumInvitationStatusFilterSchema } from './EnumInvitationStatusFilterSchema';
import { InvitationStatusSchema } from './InvitationStatusSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { UserNullableRelationFilterSchema } from './UserNullableRelationFilterSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';

export const InvitationRelationWhereInputSchema: z.ZodType<Prisma.InvitationRelationWhereInput> = z.object({
  AND: z.union([ z.lazy(() => InvitationRelationWhereInputSchema),z.lazy(() => InvitationRelationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => InvitationRelationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => InvitationRelationWhereInputSchema),z.lazy(() => InvitationRelationWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.date() ]).optional(),
  status: z.union([ z.lazy(() => EnumInvitationStatusFilterSchema),z.lazy(() => InvitationStatusSchema) ]).optional(),
  fromId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  toId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  from: z.union([ z.lazy(() => UserNullableRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
  to: z.union([ z.lazy(() => UserNullableRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
}).strict();

export default InvitationRelationWhereInputSchema;
