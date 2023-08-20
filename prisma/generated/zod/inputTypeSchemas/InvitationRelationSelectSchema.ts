import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema"

export const InvitationRelationSelectSchema: z.ZodType<Prisma.InvitationRelationSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  status: z.boolean().optional(),
  fromId: z.boolean().optional(),
  toId: z.boolean().optional(),
  from: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  to: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export default InvitationRelationSelectSchema;
