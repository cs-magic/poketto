import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { InvitationRelationCreateInputSchema } from '../inputTypeSchemas/InvitationRelationCreateInputSchema'
import { InvitationRelationUncheckedCreateInputSchema } from '../inputTypeSchemas/InvitationRelationUncheckedCreateInputSchema'

export const InvitationRelationCreateArgsSchema: z.ZodType<Omit<Prisma.InvitationRelationCreateArgs, "select" | "include">> = z.object({
  data: z.union([ InvitationRelationCreateInputSchema,InvitationRelationUncheckedCreateInputSchema ]),
}).strict()

export default InvitationRelationCreateArgsSchema;
