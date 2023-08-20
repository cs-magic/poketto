import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ChatMessageWhereUniqueInputSchema } from './ChatMessageWhereUniqueInputSchema';
import { ChatMessageUpdateWithoutConversationInputSchema } from './ChatMessageUpdateWithoutConversationInputSchema';
import { ChatMessageUncheckedUpdateWithoutConversationInputSchema } from './ChatMessageUncheckedUpdateWithoutConversationInputSchema';

export const ChatMessageUpdateWithWhereUniqueWithoutConversationInputSchema: z.ZodType<Prisma.ChatMessageUpdateWithWhereUniqueWithoutConversationInput> = z.object({
  where: z.lazy(() => ChatMessageWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ChatMessageUpdateWithoutConversationInputSchema),z.lazy(() => ChatMessageUncheckedUpdateWithoutConversationInputSchema) ]),
}).strict();

export default ChatMessageUpdateWithWhereUniqueWithoutConversationInputSchema;
