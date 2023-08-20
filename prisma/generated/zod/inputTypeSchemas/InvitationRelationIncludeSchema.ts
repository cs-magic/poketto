import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema"

export const InvitationRelationIncludeSchema: z.ZodType<Prisma.InvitationRelationInclude> = z.object({
  from: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  to: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export default InvitationRelationIncludeSchema;
