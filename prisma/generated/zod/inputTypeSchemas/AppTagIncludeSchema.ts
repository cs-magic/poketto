import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema"
import { AppFindManyArgsSchema } from "../outputTypeSchemas/AppFindManyArgsSchema"
import { AppTagCountOutputTypeArgsSchema } from "../outputTypeSchemas/AppTagCountOutputTypeArgsSchema"

export const AppTagIncludeSchema: z.ZodType<Prisma.AppTagInclude> = z.object({
  creator: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  apps: z.union([z.boolean(),z.lazy(() => AppFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => AppTagCountOutputTypeArgsSchema)]).optional(),
}).strict()

export default AppTagIncludeSchema;
