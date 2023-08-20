import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { InvitationRelationWhereInputSchema } from '../inputTypeSchemas/InvitationRelationWhereInputSchema'
import { InvitationRelationOrderByWithAggregationInputSchema } from '../inputTypeSchemas/InvitationRelationOrderByWithAggregationInputSchema'
import { InvitationRelationScalarFieldEnumSchema } from '../inputTypeSchemas/InvitationRelationScalarFieldEnumSchema'
import { InvitationRelationScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/InvitationRelationScalarWhereWithAggregatesInputSchema'

export const InvitationRelationGroupByArgsSchema: z.ZodType<Prisma.InvitationRelationGroupByArgs> = z.object({
  where: InvitationRelationWhereInputSchema.optional(),
  orderBy: z.union([ InvitationRelationOrderByWithAggregationInputSchema.array(),InvitationRelationOrderByWithAggregationInputSchema ]).optional(),
  by: InvitationRelationScalarFieldEnumSchema.array(),
  having: InvitationRelationScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export default InvitationRelationGroupByArgsSchema;
