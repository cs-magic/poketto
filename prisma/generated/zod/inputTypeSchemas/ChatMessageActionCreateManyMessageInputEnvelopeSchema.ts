import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ChatMessageActionCreateManyMessageInputSchema } from './ChatMessageActionCreateManyMessageInputSchema';

export const ChatMessageActionCreateManyMessageInputEnvelopeSchema: z.ZodType<Prisma.ChatMessageActionCreateManyMessageInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ChatMessageActionCreateManyMessageInputSchema),z.lazy(() => ChatMessageActionCreateManyMessageInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default ChatMessageActionCreateManyMessageInputEnvelopeSchema;
