import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { InvitationRelationWhereInputSchema } from '../inputTypeSchemas/InvitationRelationWhereInputSchema'
import { InvitationRelationOrderByWithRelationInputSchema } from '../inputTypeSchemas/InvitationRelationOrderByWithRelationInputSchema'
import { InvitationRelationWhereUniqueInputSchema } from '../inputTypeSchemas/InvitationRelationWhereUniqueInputSchema'
import { InvitationRelationScalarFieldEnumSchema } from '../inputTypeSchemas/InvitationRelationScalarFieldEnumSchema'

export const InvitationRelationFindFirstArgsSchema: z.ZodType<Omit<Prisma.InvitationRelationFindFirstArgs, "select" | "include">> = z.object({
  where: InvitationRelationWhereInputSchema.optional(),
  orderBy: z.union([ InvitationRelationOrderByWithRelationInputSchema.array(),InvitationRelationOrderByWithRelationInputSchema ]).optional(),
  cursor: InvitationRelationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ InvitationRelationScalarFieldEnumSchema,InvitationRelationScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export default InvitationRelationFindFirstArgsSchema;
