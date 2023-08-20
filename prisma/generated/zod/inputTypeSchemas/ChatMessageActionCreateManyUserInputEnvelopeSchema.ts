import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ChatMessageActionCreateManyUserInputSchema } from './ChatMessageActionCreateManyUserInputSchema';

export const ChatMessageActionCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.ChatMessageActionCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ChatMessageActionCreateManyUserInputSchema),z.lazy(() => ChatMessageActionCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default ChatMessageActionCreateManyUserInputEnvelopeSchema;
