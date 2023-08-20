import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StringFilterSchema } from './StringFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { UserRelationFilterSchema } from './UserRelationFilterSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';

export const FollowRelationWhereInputSchema: z.ZodType<Prisma.FollowRelationWhereInput> = z.object({
  AND: z.union([ z.lazy(() => FollowRelationWhereInputSchema),z.lazy(() => FollowRelationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FollowRelationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FollowRelationWhereInputSchema),z.lazy(() => FollowRelationWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.date() ]).optional(),
  fromId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  toId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  from: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  to: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export default FollowRelationWhereInputSchema;
