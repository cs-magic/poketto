import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { InvitationRelationCreateManyInputSchema } from '../inputTypeSchemas/InvitationRelationCreateManyInputSchema'

export const InvitationRelationCreateManyArgsSchema: z.ZodType<Prisma.InvitationRelationCreateManyArgs> = z.object({
  data: z.union([ InvitationRelationCreateManyInputSchema,InvitationRelationCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export default InvitationRelationCreateManyArgsSchema;
