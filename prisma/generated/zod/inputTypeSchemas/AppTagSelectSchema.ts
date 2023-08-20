import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema"
import { AppFindManyArgsSchema } from "../outputTypeSchemas/AppFindManyArgsSchema"
import { AppTagCountOutputTypeArgsSchema } from "../outputTypeSchemas/AppTagCountOutputTypeArgsSchema"

export const AppTagSelectSchema: z.ZodType<Prisma.AppTagSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  creatorId: z.boolean().optional(),
  name: z.boolean().optional(),
  creator: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  apps: z.union([z.boolean(),z.lazy(() => AppFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => AppTagCountOutputTypeArgsSchema)]).optional(),
}).strict()

export default AppTagSelectSchema;
