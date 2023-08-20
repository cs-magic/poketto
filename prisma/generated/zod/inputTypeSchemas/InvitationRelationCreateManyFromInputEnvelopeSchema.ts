import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { InvitationRelationCreateManyFromInputSchema } from './InvitationRelationCreateManyFromInputSchema';

export const InvitationRelationCreateManyFromInputEnvelopeSchema: z.ZodType<Prisma.InvitationRelationCreateManyFromInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => InvitationRelationCreateManyFromInputSchema),z.lazy(() => InvitationRelationCreateManyFromInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default InvitationRelationCreateManyFromInputEnvelopeSchema;
