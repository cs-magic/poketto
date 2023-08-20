import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ChatMessageCreateManyUserInputSchema } from './ChatMessageCreateManyUserInputSchema';

export const ChatMessageCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.ChatMessageCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ChatMessageCreateManyUserInputSchema),z.lazy(() => ChatMessageCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default ChatMessageCreateManyUserInputEnvelopeSchema;
