import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { PromptRoleTypeSchema } from './PromptRoleTypeSchema';
import { NestedIntFilterSchema } from './NestedIntFilterSchema';
import { NestedEnumPromptRoleTypeFilterSchema } from './NestedEnumPromptRoleTypeFilterSchema';

export const NestedEnumPromptRoleTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumPromptRoleTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => PromptRoleTypeSchema).optional(),
  in: z.lazy(() => PromptRoleTypeSchema).array().optional(),
  notIn: z.lazy(() => PromptRoleTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => PromptRoleTypeSchema),z.lazy(() => NestedEnumPromptRoleTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumPromptRoleTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumPromptRoleTypeFilterSchema).optional()
}).strict();

export default NestedEnumPromptRoleTypeWithAggregatesFilterSchema;
