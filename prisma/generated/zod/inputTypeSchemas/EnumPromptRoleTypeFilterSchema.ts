import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { PromptRoleTypeSchema } from './PromptRoleTypeSchema';
import { NestedEnumPromptRoleTypeFilterSchema } from './NestedEnumPromptRoleTypeFilterSchema';

export const EnumPromptRoleTypeFilterSchema: z.ZodType<Prisma.EnumPromptRoleTypeFilter> = z.object({
  equals: z.lazy(() => PromptRoleTypeSchema).optional(),
  in: z.lazy(() => PromptRoleTypeSchema).array().optional(),
  notIn: z.lazy(() => PromptRoleTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => PromptRoleTypeSchema),z.lazy(() => NestedEnumPromptRoleTypeFilterSchema) ]).optional(),
}).strict();

export default EnumPromptRoleTypeFilterSchema;
