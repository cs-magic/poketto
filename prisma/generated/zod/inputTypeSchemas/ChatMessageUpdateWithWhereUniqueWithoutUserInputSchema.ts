import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ChatMessageWhereUniqueInputSchema } from './ChatMessageWhereUniqueInputSchema';
import { ChatMessageUpdateWithoutUserInputSchema } from './ChatMessageUpdateWithoutUserInputSchema';
import { ChatMessageUncheckedUpdateWithoutUserInputSchema } from './ChatMessageUncheckedUpdateWithoutUserInputSchema';

export const ChatMessageUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.ChatMessageUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => ChatMessageWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ChatMessageUpdateWithoutUserInputSchema),z.lazy(() => ChatMessageUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export default ChatMessageUpdateWithWhereUniqueWithoutUserInputSchema;
