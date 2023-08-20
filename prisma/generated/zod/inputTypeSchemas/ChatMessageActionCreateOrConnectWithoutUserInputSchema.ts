import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ChatMessageActionWhereUniqueInputSchema } from './ChatMessageActionWhereUniqueInputSchema';
import { ChatMessageActionCreateWithoutUserInputSchema } from './ChatMessageActionCreateWithoutUserInputSchema';
import { ChatMessageActionUncheckedCreateWithoutUserInputSchema } from './ChatMessageActionUncheckedCreateWithoutUserInputSchema';

export const ChatMessageActionCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.ChatMessageActionCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => ChatMessageActionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ChatMessageActionCreateWithoutUserInputSchema),z.lazy(() => ChatMessageActionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export default ChatMessageActionCreateOrConnectWithoutUserInputSchema;
