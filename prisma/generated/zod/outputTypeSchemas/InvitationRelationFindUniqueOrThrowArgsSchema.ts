import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { InvitationRelationWhereUniqueInputSchema } from '../inputTypeSchemas/InvitationRelationWhereUniqueInputSchema'

export const InvitationRelationFindUniqueOrThrowArgsSchema: z.ZodType<Omit<Prisma.InvitationRelationFindUniqueOrThrowArgs, "select" | "include">> = z.object({
  where: InvitationRelationWhereUniqueInputSchema,
}).strict()

export default InvitationRelationFindUniqueOrThrowArgsSchema;
