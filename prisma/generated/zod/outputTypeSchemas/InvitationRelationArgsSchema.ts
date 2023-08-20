import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { InvitationRelationSelectSchema } from '../inputTypeSchemas/InvitationRelationSelectSchema';
import { InvitationRelationIncludeSchema } from '../inputTypeSchemas/InvitationRelationIncludeSchema';

export const InvitationRelationArgsSchema: z.ZodType<Prisma.InvitationRelationArgs> = z.object({
  select: z.lazy(() => InvitationRelationSelectSchema).optional(),
  include: z.lazy(() => InvitationRelationIncludeSchema).optional(),
}).strict();

export default InvitationRelationArgsSchema;
