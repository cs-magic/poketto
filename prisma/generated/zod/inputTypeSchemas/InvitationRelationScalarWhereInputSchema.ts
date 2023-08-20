import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StringFilterSchema } from './StringFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { EnumInvitationStatusFilterSchema } from './EnumInvitationStatusFilterSchema';
import { InvitationStatusSchema } from './InvitationStatusSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';

export const InvitationRelationScalarWhereInputSchema: z.ZodType<Prisma.InvitationRelationScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => InvitationRelationScalarWhereInputSchema),z.lazy(() => InvitationRelationScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => InvitationRelationScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => InvitationRelationScalarWhereInputSchema),z.lazy(() => InvitationRelationScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.date() ]).optional(),
  status: z.union([ z.lazy(() => EnumInvitationStatusFilterSchema),z.lazy(() => InvitationStatusSchema) ]).optional(),
  fromId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  toId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export default InvitationRelationScalarWhereInputSchema;
