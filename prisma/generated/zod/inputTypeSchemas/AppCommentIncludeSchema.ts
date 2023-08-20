import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema"
import { AppArgsSchema } from "../outputTypeSchemas/AppArgsSchema"

export const AppCommentIncludeSchema: z.ZodType<Prisma.AppCommentInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  aApp: z.union([z.boolean(),z.lazy(() => AppArgsSchema)]).optional(),
}).strict()

export default AppCommentIncludeSchema;
