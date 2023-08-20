import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { InvitationRelationWhereUniqueInputSchema } from '../inputTypeSchemas/InvitationRelationWhereUniqueInputSchema'

export const InvitationRelationDeleteArgsSchema: z.ZodType<Omit<Prisma.InvitationRelationDeleteArgs, "select" | "include">> = z.object({
  where: InvitationRelationWhereUniqueInputSchema,
}).strict()

export default InvitationRelationDeleteArgsSchema;
