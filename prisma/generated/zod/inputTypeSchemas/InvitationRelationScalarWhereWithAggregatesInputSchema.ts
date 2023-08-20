import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StringWithAggregatesFilterSchema } from './StringWithAggregatesFilterSchema';
import { DateTimeWithAggregatesFilterSchema } from './DateTimeWithAggregatesFilterSchema';
import { EnumInvitationStatusWithAggregatesFilterSchema } from './EnumInvitationStatusWithAggregatesFilterSchema';
import { InvitationStatusSchema } from './InvitationStatusSchema';
import { StringNullableWithAggregatesFilterSchema } from './StringNullableWithAggregatesFilterSchema';

export const InvitationRelationScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.InvitationRelationScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => InvitationRelationScalarWhereWithAggregatesInputSchema),z.lazy(() => InvitationRelationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => InvitationRelationScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => InvitationRelationScalarWhereWithAggregatesInputSchema),z.lazy(() => InvitationRelationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.date() ]).optional(),
  status: z.union([ z.lazy(() => EnumInvitationStatusWithAggregatesFilterSchema),z.lazy(() => InvitationStatusSchema) ]).optional(),
  fromId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  toId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export default InvitationRelationScalarWhereWithAggregatesInputSchema;
