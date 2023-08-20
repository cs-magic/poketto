import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema"

export const FollowRelationSelectSchema: z.ZodType<Prisma.FollowRelationSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  fromId: z.boolean().optional(),
  toId: z.boolean().optional(),
  from: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  to: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export default FollowRelationSelectSchema;
