import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { InvitationRelationWhereUniqueInputSchema } from '../inputTypeSchemas/InvitationRelationWhereUniqueInputSchema'

export const InvitationRelationFindUniqueArgsSchema: z.ZodType<Omit<Prisma.InvitationRelationFindUniqueArgs, "select" | "include">> = z.object({
  where: InvitationRelationWhereUniqueInputSchema,
}).strict()

export default InvitationRelationFindUniqueArgsSchema;
