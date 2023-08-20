import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AppArgsSchema } from "../outputTypeSchemas/AppArgsSchema"
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema"

export const StarringAppSelectSchema: z.ZodType<Prisma.StarringAppSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  appId: z.boolean().optional(),
  isActive: z.boolean().optional(),
  userId: z.boolean().optional(),
  app: z.union([z.boolean(),z.lazy(() => AppArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export default StarringAppSelectSchema;
