import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AppCategorySelectSchema } from '../inputTypeSchemas/AppCategorySelectSchema';
import { AppCategoryIncludeSchema } from '../inputTypeSchemas/AppCategoryIncludeSchema';

export const AppCategoryArgsSchema: z.ZodType<Prisma.AppCategoryArgs> = z.object({
  select: z.lazy(() => AppCategorySelectSchema).optional(),
  include: z.lazy(() => AppCategoryIncludeSchema).optional(),
}).strict();

export default AppCategoryArgsSchema;
