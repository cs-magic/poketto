import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AppFindManyArgsSchema } from "../outputTypeSchemas/AppFindManyArgsSchema"
import { AppCategoryCountOutputTypeArgsSchema } from "../outputTypeSchemas/AppCategoryCountOutputTypeArgsSchema"

export const AppCategorySelectSchema: z.ZodType<Prisma.AppCategorySelect> = z.object({
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  main: z.boolean().optional(),
  sub: z.boolean().optional(),
  App: z.union([z.boolean(),z.lazy(() => AppFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => AppCategoryCountOutputTypeArgsSchema)]).optional(),
}).strict()

export default AppCategorySelectSchema;
