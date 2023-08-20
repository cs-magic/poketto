import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ChatMessageWhereUniqueInputSchema } from './ChatMessageWhereUniqueInputSchema';
import { ChatMessageCreateWithoutConversationInputSchema } from './ChatMessageCreateWithoutConversationInputSchema';
import { ChatMessageUncheckedCreateWithoutConversationInputSchema } from './ChatMessageUncheckedCreateWithoutConversationInputSchema';

export const ChatMessageCreateOrConnectWithoutConversationInputSchema: z.ZodType<Prisma.ChatMessageCreateOrConnectWithoutConversationInput> = z.object({
  where: z.lazy(() => ChatMessageWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ChatMessageCreateWithoutConversationInputSchema),z.lazy(() => ChatMessageUncheckedCreateWithoutConversationInputSchema) ]),
}).strict();

export default ChatMessageCreateOrConnectWithoutConversationInputSchema;
