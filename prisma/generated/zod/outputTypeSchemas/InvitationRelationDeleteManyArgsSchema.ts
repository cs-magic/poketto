import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { InvitationRelationWhereInputSchema } from '../inputTypeSchemas/InvitationRelationWhereInputSchema'

export const InvitationRelationDeleteManyArgsSchema: z.ZodType<Prisma.InvitationRelationDeleteManyArgs> = z.object({
  where: InvitationRelationWhereInputSchema.optional(),
}).strict()

export default InvitationRelationDeleteManyArgsSchema;
