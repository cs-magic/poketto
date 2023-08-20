import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { InvitationRelationUpdateInputSchema } from '../inputTypeSchemas/InvitationRelationUpdateInputSchema'
import { InvitationRelationUncheckedUpdateInputSchema } from '../inputTypeSchemas/InvitationRelationUncheckedUpdateInputSchema'
import { InvitationRelationWhereUniqueInputSchema } from '../inputTypeSchemas/InvitationRelationWhereUniqueInputSchema'

export const InvitationRelationUpdateArgsSchema: z.ZodType<Omit<Prisma.InvitationRelationUpdateArgs, "select" | "include">> = z.object({
  data: z.union([ InvitationRelationUpdateInputSchema,InvitationRelationUncheckedUpdateInputSchema ]),
  where: InvitationRelationWhereUniqueInputSchema,
}).strict()

export default InvitationRelationUpdateArgsSchema;
