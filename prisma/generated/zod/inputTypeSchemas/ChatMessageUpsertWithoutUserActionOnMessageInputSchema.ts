import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ChatMessageUpdateWithoutUserActionOnMessageInputSchema } from './ChatMessageUpdateWithoutUserActionOnMessageInputSchema';
import { ChatMessageUncheckedUpdateWithoutUserActionOnMessageInputSchema } from './ChatMessageUncheckedUpdateWithoutUserActionOnMessageInputSchema';
import { ChatMessageCreateWithoutUserActionOnMessageInputSchema } from './ChatMessageCreateWithoutUserActionOnMessageInputSchema';
import { ChatMessageUncheckedCreateWithoutUserActionOnMessageInputSchema } from './ChatMessageUncheckedCreateWithoutUserActionOnMessageInputSchema';
import { ChatMessageWhereInputSchema } from './ChatMessageWhereInputSchema';

export const ChatMessageUpsertWithoutUserActionOnMessageInputSchema: z.ZodType<Prisma.ChatMessageUpsertWithoutUserActionOnMessageInput> = z.object({
  update: z.union([ z.lazy(() => ChatMessageUpdateWithoutUserActionOnMessageInputSchema),z.lazy(() => ChatMessageUncheckedUpdateWithoutUserActionOnMessageInputSchema) ]),
  create: z.union([ z.lazy(() => ChatMessageCreateWithoutUserActionOnMessageInputSchema),z.lazy(() => ChatMessageUncheckedCreateWithoutUserActionOnMessageInputSchema) ]),
  where: z.lazy(() => ChatMessageWhereInputSchema).optional()
}).strict();

export default ChatMessageUpsertWithoutUserActionOnMessageInputSchema;
