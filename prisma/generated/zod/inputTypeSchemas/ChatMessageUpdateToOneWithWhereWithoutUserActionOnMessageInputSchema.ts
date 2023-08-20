import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ChatMessageWhereInputSchema } from './ChatMessageWhereInputSchema';
import { ChatMessageUpdateWithoutUserActionOnMessageInputSchema } from './ChatMessageUpdateWithoutUserActionOnMessageInputSchema';
import { ChatMessageUncheckedUpdateWithoutUserActionOnMessageInputSchema } from './ChatMessageUncheckedUpdateWithoutUserActionOnMessageInputSchema';

export const ChatMessageUpdateToOneWithWhereWithoutUserActionOnMessageInputSchema: z.ZodType<Prisma.ChatMessageUpdateToOneWithWhereWithoutUserActionOnMessageInput> = z.object({
  where: z.lazy(() => ChatMessageWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ChatMessageUpdateWithoutUserActionOnMessageInputSchema),z.lazy(() => ChatMessageUncheckedUpdateWithoutUserActionOnMessageInputSchema) ]),
}).strict();

export default ChatMessageUpdateToOneWithWhereWithoutUserActionOnMessageInputSchema;
