import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ChatMessageScalarWhereInputSchema } from './ChatMessageScalarWhereInputSchema';
import { ChatMessageUpdateManyMutationInputSchema } from './ChatMessageUpdateManyMutationInputSchema';
import { ChatMessageUncheckedUpdateManyWithoutConversationInputSchema } from './ChatMessageUncheckedUpdateManyWithoutConversationInputSchema';

export const ChatMessageUpdateManyWithWhereWithoutConversationInputSchema: z.ZodType<Prisma.ChatMessageUpdateManyWithWhereWithoutConversationInput> = z.object({
  where: z.lazy(() => ChatMessageScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ChatMessageUpdateManyMutationInputSchema),z.lazy(() => ChatMessageUncheckedUpdateManyWithoutConversationInputSchema) ]),
}).strict();

export default ChatMessageUpdateManyWithWhereWithoutConversationInputSchema;
