import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { FollowRelationCreateManyToInputSchema } from './FollowRelationCreateManyToInputSchema';

export const FollowRelationCreateManyToInputEnvelopeSchema: z.ZodType<Prisma.FollowRelationCreateManyToInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => FollowRelationCreateManyToInputSchema),z.lazy(() => FollowRelationCreateManyToInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default FollowRelationCreateManyToInputEnvelopeSchema;
