import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { InvitationRelationWhereUniqueInputSchema } from '../inputTypeSchemas/InvitationRelationWhereUniqueInputSchema'
import { InvitationRelationCreateInputSchema } from '../inputTypeSchemas/InvitationRelationCreateInputSchema'
import { InvitationRelationUncheckedCreateInputSchema } from '../inputTypeSchemas/InvitationRelationUncheckedCreateInputSchema'
import { InvitationRelationUpdateInputSchema } from '../inputTypeSchemas/InvitationRelationUpdateInputSchema'
import { InvitationRelationUncheckedUpdateInputSchema } from '../inputTypeSchemas/InvitationRelationUncheckedUpdateInputSchema'

export const InvitationRelationUpsertArgsSchema: z.ZodType<Omit<Prisma.InvitationRelationUpsertArgs, "select" | "include">> = z.object({
  where: InvitationRelationWhereUniqueInputSchema,
  create: z.union([ InvitationRelationCreateInputSchema,InvitationRelationUncheckedCreateInputSchema ]),
  update: z.union([ InvitationRelationUpdateInputSchema,InvitationRelationUncheckedUpdateInputSchema ]),
}).strict()

export default InvitationRelationUpsertArgsSchema;
