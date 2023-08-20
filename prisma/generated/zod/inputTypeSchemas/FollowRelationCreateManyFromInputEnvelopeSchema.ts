import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { FollowRelationCreateManyFromInputSchema } from './FollowRelationCreateManyFromInputSchema';

export const FollowRelationCreateManyFromInputEnvelopeSchema: z.ZodType<Prisma.FollowRelationCreateManyFromInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => FollowRelationCreateManyFromInputSchema),z.lazy(() => FollowRelationCreateManyFromInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default FollowRelationCreateManyFromInputEnvelopeSchema;
