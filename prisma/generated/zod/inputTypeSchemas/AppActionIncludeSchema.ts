import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema"
import { AppArgsSchema } from "../outputTypeSchemas/AppArgsSchema"

export const AppActionIncludeSchema: z.ZodType<Prisma.AppActionInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  app: z.union([z.boolean(),z.lazy(() => AppArgsSchema)]).optional(),
}).strict()

export default AppActionIncludeSchema;
