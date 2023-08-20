import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ChatMessageActionWhereUniqueInputSchema } from './ChatMessageActionWhereUniqueInputSchema';
import { ChatMessageActionCreateWithoutMessageInputSchema } from './ChatMessageActionCreateWithoutMessageInputSchema';
import { ChatMessageActionUncheckedCreateWithoutMessageInputSchema } from './ChatMessageActionUncheckedCreateWithoutMessageInputSchema';

export const ChatMessageActionCreateOrConnectWithoutMessageInputSchema: z.ZodType<Prisma.ChatMessageActionCreateOrConnectWithoutMessageInput> = z.object({
  where: z.lazy(() => ChatMessageActionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ChatMessageActionCreateWithoutMessageInputSchema),z.lazy(() => ChatMessageActionUncheckedCreateWithoutMessageInputSchema) ]),
}).strict();

export default ChatMessageActionCreateOrConnectWithoutMessageInputSchema;
