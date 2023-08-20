import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StringFilterSchema } from './StringFilterSchema';
import { EnumPlatformTypeFilterSchema } from './EnumPlatformTypeFilterSchema';
import { PlatformTypeSchema } from './PlatformTypeSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { IntFilterSchema } from './IntFilterSchema';
import { BoolFilterSchema } from './BoolFilterSchema';
import { JsonNullableFilterSchema } from './JsonNullableFilterSchema';

export const AppScalarWhereInputSchema: z.ZodType<Prisma.AppScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AppScalarWhereInputSchema),z.lazy(() => AppScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AppScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AppScalarWhereInputSchema),z.lazy(() => AppScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  platformType: z.union([ z.lazy(() => EnumPlatformTypeFilterSchema),z.lazy(() => PlatformTypeSchema) ]).optional(),
  platformId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.date() ]).optional(),
  creatorId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  avatar: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  desc: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  language: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  version: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  categoryMain: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  categorySub: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  modelName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  isOpenSource: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  modelArgs: z.lazy(() => JsonNullableFilterSchema).optional()
}).strict();

export default AppScalarWhereInputSchema;
