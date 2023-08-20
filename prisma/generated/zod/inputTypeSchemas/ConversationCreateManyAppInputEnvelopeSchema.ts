import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ConversationCreateManyAppInputSchema } from './ConversationCreateManyAppInputSchema';

export const ConversationCreateManyAppInputEnvelopeSchema: z.ZodType<Prisma.ConversationCreateManyAppInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ConversationCreateManyAppInputSchema),z.lazy(() => ConversationCreateManyAppInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default ConversationCreateManyAppInputEnvelopeSchema;
