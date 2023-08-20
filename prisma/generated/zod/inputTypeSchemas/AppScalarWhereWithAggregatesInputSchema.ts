import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StringWithAggregatesFilterSchema } from './StringWithAggregatesFilterSchema';
import { EnumPlatformTypeWithAggregatesFilterSchema } from './EnumPlatformTypeWithAggregatesFilterSchema';
import { PlatformTypeSchema } from './PlatformTypeSchema';
import { DateTimeWithAggregatesFilterSchema } from './DateTimeWithAggregatesFilterSchema';
import { IntWithAggregatesFilterSchema } from './IntWithAggregatesFilterSchema';
import { BoolWithAggregatesFilterSchema } from './BoolWithAggregatesFilterSchema';
import { JsonNullableWithAggregatesFilterSchema } from './JsonNullableWithAggregatesFilterSchema';

export const AppScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AppScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AppScalarWhereWithAggregatesInputSchema),z.lazy(() => AppScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AppScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AppScalarWhereWithAggregatesInputSchema),z.lazy(() => AppScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  platformType: z.union([ z.lazy(() => EnumPlatformTypeWithAggregatesFilterSchema),z.lazy(() => PlatformTypeSchema) ]).optional(),
  platformId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.date() ]).optional(),
  creatorId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  avatar: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  desc: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  language: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  version: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  categoryMain: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  categorySub: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  modelName: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  isOpenSource: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  modelArgs: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional()
}).strict();

export default AppScalarWhereWithAggregatesInputSchema;
