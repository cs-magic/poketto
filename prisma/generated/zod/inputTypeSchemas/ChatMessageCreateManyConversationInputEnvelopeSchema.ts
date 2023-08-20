import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ChatMessageCreateManyConversationInputSchema } from './ChatMessageCreateManyConversationInputSchema';

export const ChatMessageCreateManyConversationInputEnvelopeSchema: z.ZodType<Prisma.ChatMessageCreateManyConversationInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ChatMessageCreateManyConversationInputSchema),z.lazy(() => ChatMessageCreateManyConversationInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default ChatMessageCreateManyConversationInputEnvelopeSchema;
