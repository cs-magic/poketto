import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StringFilterSchema } from './StringFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';

export const FollowRelationScalarWhereInputSchema: z.ZodType<Prisma.FollowRelationScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => FollowRelationScalarWhereInputSchema),z.lazy(() => FollowRelationScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FollowRelationScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FollowRelationScalarWhereInputSchema),z.lazy(() => FollowRelationScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.date() ]).optional(),
  fromId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  toId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export default FollowRelationScalarWhereInputSchema;
