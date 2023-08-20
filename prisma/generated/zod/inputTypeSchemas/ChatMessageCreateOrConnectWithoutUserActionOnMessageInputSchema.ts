import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ChatMessageWhereUniqueInputSchema } from './ChatMessageWhereUniqueInputSchema';
import { ChatMessageCreateWithoutUserActionOnMessageInputSchema } from './ChatMessageCreateWithoutUserActionOnMessageInputSchema';
import { ChatMessageUncheckedCreateWithoutUserActionOnMessageInputSchema } from './ChatMessageUncheckedCreateWithoutUserActionOnMessageInputSchema';

export const ChatMessageCreateOrConnectWithoutUserActionOnMessageInputSchema: z.ZodType<Prisma.ChatMessageCreateOrConnectWithoutUserActionOnMessageInput> = z.object({
  where: z.lazy(() => ChatMessageWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ChatMessageCreateWithoutUserActionOnMessageInputSchema),z.lazy(() => ChatMessageUncheckedCreateWithoutUserActionOnMessageInputSchema) ]),
}).strict();

export default ChatMessageCreateOrConnectWithoutUserActionOnMessageInputSchema;
