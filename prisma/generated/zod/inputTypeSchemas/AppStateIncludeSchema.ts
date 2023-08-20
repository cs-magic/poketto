import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AppArgsSchema } from "../outputTypeSchemas/AppArgsSchema"

export const AppStateIncludeSchema: z.ZodType<Prisma.AppStateInclude> = z.object({
  app: z.union([z.boolean(),z.lazy(() => AppArgsSchema)]).optional(),
}).strict()

export default AppStateIncludeSchema;
