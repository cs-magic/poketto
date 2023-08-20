import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AppArgsSchema } from "../outputTypeSchemas/AppArgsSchema"
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema"

export const StarringAppIncludeSchema: z.ZodType<Prisma.StarringAppInclude> = z.object({
  app: z.union([z.boolean(),z.lazy(() => AppArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export default StarringAppIncludeSchema;
