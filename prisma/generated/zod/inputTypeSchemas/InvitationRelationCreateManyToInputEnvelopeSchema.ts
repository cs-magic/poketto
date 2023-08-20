import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { InvitationRelationCreateManyToInputSchema } from './InvitationRelationCreateManyToInputSchema';

export const InvitationRelationCreateManyToInputEnvelopeSchema: z.ZodType<Prisma.InvitationRelationCreateManyToInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => InvitationRelationCreateManyToInputSchema),z.lazy(() => InvitationRelationCreateManyToInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default InvitationRelationCreateManyToInputEnvelopeSchema;
