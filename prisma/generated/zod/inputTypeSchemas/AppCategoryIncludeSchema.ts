import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AppFindManyArgsSchema } from "../outputTypeSchemas/AppFindManyArgsSchema"
import { AppCategoryCountOutputTypeArgsSchema } from "../outputTypeSchemas/AppCategoryCountOutputTypeArgsSchema"

export const AppCategoryIncludeSchema: z.ZodType<Prisma.AppCategoryInclude> = z.object({
  App: z.union([z.boolean(),z.lazy(() => AppFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => AppCategoryCountOutputTypeArgsSchema)]).optional(),
}).strict()

export default AppCategoryIncludeSchema;
