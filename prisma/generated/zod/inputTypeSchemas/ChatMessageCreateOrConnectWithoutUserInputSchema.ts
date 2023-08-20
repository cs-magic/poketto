import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ChatMessageWhereUniqueInputSchema } from './ChatMessageWhereUniqueInputSchema';
import { ChatMessageCreateWithoutUserInputSchema } from './ChatMessageCreateWithoutUserInputSchema';
import { ChatMessageUncheckedCreateWithoutUserInputSchema } from './ChatMessageUncheckedCreateWithoutUserInputSchema';

export const ChatMessageCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.ChatMessageCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => ChatMessageWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ChatMessageCreateWithoutUserInputSchema),z.lazy(() => ChatMessageUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export default ChatMessageCreateOrConnectWithoutUserInputSchema;
