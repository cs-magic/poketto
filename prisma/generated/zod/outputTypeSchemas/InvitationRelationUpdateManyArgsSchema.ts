import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { InvitationRelationUpdateManyMutationInputSchema } from '../inputTypeSchemas/InvitationRelationUpdateManyMutationInputSchema'
import { InvitationRelationUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/InvitationRelationUncheckedUpdateManyInputSchema'
import { InvitationRelationWhereInputSchema } from '../inputTypeSchemas/InvitationRelationWhereInputSchema'

export const InvitationRelationUpdateManyArgsSchema: z.ZodType<Prisma.InvitationRelationUpdateManyArgs> = z.object({
  data: z.union([ InvitationRelationUpdateManyMutationInputSchema,InvitationRelationUncheckedUpdateManyInputSchema ]),
  where: InvitationRelationWhereInputSchema.optional(),
}).strict()

export default InvitationRelationUpdateManyArgsSchema;
