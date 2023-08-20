import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StringWithAggregatesFilterSchema } from './StringWithAggregatesFilterSchema';
import { DateTimeWithAggregatesFilterSchema } from './DateTimeWithAggregatesFilterSchema';

export const FollowRelationScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.FollowRelationScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => FollowRelationScalarWhereWithAggregatesInputSchema),z.lazy(() => FollowRelationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => FollowRelationScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FollowRelationScalarWhereWithAggregatesInputSchema),z.lazy(() => FollowRelationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.date() ]).optional(),
  fromId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  toId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export default FollowRelationScalarWhereWithAggregatesInputSchema;
