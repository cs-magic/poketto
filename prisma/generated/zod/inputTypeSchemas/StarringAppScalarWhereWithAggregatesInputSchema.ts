import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StringWithAggregatesFilterSchema } from './StringWithAggregatesFilterSchema';
import { DateTimeWithAggregatesFilterSchema } from './DateTimeWithAggregatesFilterSchema';
import { BoolWithAggregatesFilterSchema } from './BoolWithAggregatesFilterSchema';

export const StarringAppScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.StarringAppScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => StarringAppScalarWhereWithAggregatesInputSchema),z.lazy(() => StarringAppScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => StarringAppScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => StarringAppScalarWhereWithAggregatesInputSchema),z.lazy(() => StarringAppScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.date() ]).optional(),
  appId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  isActive: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export default StarringAppScalarWhereWithAggregatesInputSchema;
