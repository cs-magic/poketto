import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema"
import { AppArgsSchema } from "../outputTypeSchemas/AppArgsSchema"

export const AppCommentSelectSchema: z.ZodType<Prisma.AppCommentSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  userId: z.boolean().optional(),
  appId: z.boolean().optional(),
  title: z.boolean().optional(),
  content: z.boolean().optional(),
  rate: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  aApp: z.union([z.boolean(),z.lazy(() => AppArgsSchema)]).optional(),
}).strict()

export default AppCommentSelectSchema;
