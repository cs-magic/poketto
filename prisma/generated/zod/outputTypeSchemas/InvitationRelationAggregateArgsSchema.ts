import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { InvitationRelationWhereInputSchema } from '../inputTypeSchemas/InvitationRelationWhereInputSchema'
import { InvitationRelationOrderByWithRelationInputSchema } from '../inputTypeSchemas/InvitationRelationOrderByWithRelationInputSchema'
import { InvitationRelationWhereUniqueInputSchema } from '../inputTypeSchemas/InvitationRelationWhereUniqueInputSchema'

export const InvitationRelationAggregateArgsSchema: z.ZodType<Prisma.InvitationRelationAggregateArgs> = z.object({
  where: InvitationRelationWhereInputSchema.optional(),
  orderBy: z.union([ InvitationRelationOrderByWithRelationInputSchema.array(),InvitationRelationOrderByWithRelationInputSchema ]).optional(),
  cursor: InvitationRelationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export default InvitationRelationAggregateArgsSchema;
