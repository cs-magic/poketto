import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ChatMessageWhereUniqueInputSchema } from './ChatMessageWhereUniqueInputSchema';
import { ChatMessageUpdateWithoutConversationInputSchema } from './ChatMessageUpdateWithoutConversationInputSchema';
import { ChatMessageUncheckedUpdateWithoutConversationInputSchema } from './ChatMessageUncheckedUpdateWithoutConversationInputSchema';
import { ChatMessageCreateWithoutConversationInputSchema } from './ChatMessageCreateWithoutConversationInputSchema';
import { ChatMessageUncheckedCreateWithoutConversationInputSchema } from './ChatMessageUncheckedCreateWithoutConversationInputSchema';

export const ChatMessageUpsertWithWhereUniqueWithoutConversationInputSchema: z.ZodType<Prisma.ChatMessageUpsertWithWhereUniqueWithoutConversationInput> = z.object({
  where: z.lazy(() => ChatMessageWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ChatMessageUpdateWithoutConversationInputSchema),z.lazy(() => ChatMessageUncheckedUpdateWithoutConversationInputSchema) ]),
  create: z.union([ z.lazy(() => ChatMessageCreateWithoutConversationInputSchema),z.lazy(() => ChatMessageUncheckedCreateWithoutConversationInputSchema) ]),
}).strict();

export default ChatMessageUpsertWithWhereUniqueWithoutConversationInputSchema;
