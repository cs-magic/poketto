import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ConversationCreateManyUserInputSchema } from './ConversationCreateManyUserInputSchema';

export const ConversationCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.ConversationCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ConversationCreateManyUserInputSchema),z.lazy(() => ConversationCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default ConversationCreateManyUserInputEnvelopeSchema;
