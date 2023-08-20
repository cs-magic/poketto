import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StringFilterSchema } from './StringFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { BoolFilterSchema } from './BoolFilterSchema';

export const StarringAppScalarWhereInputSchema: z.ZodType<Prisma.StarringAppScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => StarringAppScalarWhereInputSchema),z.lazy(() => StarringAppScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => StarringAppScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => StarringAppScalarWhereInputSchema),z.lazy(() => StarringAppScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.date() ]).optional(),
  appId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  isActive: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export default StarringAppScalarWhereInputSchema;
