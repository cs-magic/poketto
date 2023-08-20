import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ChatMessageCreateWithoutUserActionOnMessageInputSchema } from './ChatMessageCreateWithoutUserActionOnMessageInputSchema';
import { ChatMessageUncheckedCreateWithoutUserActionOnMessageInputSchema } from './ChatMessageUncheckedCreateWithoutUserActionOnMessageInputSchema';
import { ChatMessageCreateOrConnectWithoutUserActionOnMessageInputSchema } from './ChatMessageCreateOrConnectWithoutUserActionOnMessageInputSchema';
import { ChatMessageWhereUniqueInputSchema } from './ChatMessageWhereUniqueInputSchema';

export const ChatMessageCreateNestedOneWithoutUserActionOnMessageInputSchema: z.ZodType<Prisma.ChatMessageCreateNestedOneWithoutUserActionOnMessageInput> = z.object({
  create: z.union([ z.lazy(() => ChatMessageCreateWithoutUserActionOnMessageInputSchema),z.lazy(() => ChatMessageUncheckedCreateWithoutUserActionOnMessageInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ChatMessageCreateOrConnectWithoutUserActionOnMessageInputSchema).optional(),
  connect: z.lazy(() => ChatMessageWhereUniqueInputSchema).optional()
}).strict();

export default ChatMessageCreateNestedOneWithoutUserActionOnMessageInputSchema;
