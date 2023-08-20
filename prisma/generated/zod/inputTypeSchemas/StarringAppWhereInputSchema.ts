import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StringFilterSchema } from './StringFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { BoolFilterSchema } from './BoolFilterSchema';
import { AppRelationFilterSchema } from './AppRelationFilterSchema';
import { AppWhereInputSchema } from './AppWhereInputSchema';
import { UserRelationFilterSchema } from './UserRelationFilterSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';

export const StarringAppWhereInputSchema: z.ZodType<Prisma.StarringAppWhereInput> = z.object({
  AND: z.union([ z.lazy(() => StarringAppWhereInputSchema),z.lazy(() => StarringAppWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => StarringAppWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => StarringAppWhereInputSchema),z.lazy(() => StarringAppWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.date() ]).optional(),
  appId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  isActive: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  app: z.union([ z.lazy(() => AppRelationFilterSchema),z.lazy(() => AppWhereInputSchema) ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export default StarringAppWhereInputSchema;
