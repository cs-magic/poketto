import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AppArgsSchema } from "../outputTypeSchemas/AppArgsSchema"

export const AppStateSelectSchema: z.ZodType<Prisma.AppStateSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  views: z.boolean().optional(),
  stars: z.boolean().optional(),
  forks: z.boolean().optional(),
  tips: z.boolean().optional(),
  calls: z.boolean().optional(),
  shares: z.boolean().optional(),
  appId: z.boolean().optional(),
  app: z.union([z.boolean(),z.lazy(() => AppArgsSchema)]).optional(),
}).strict()

export default AppStateSelectSchema;
