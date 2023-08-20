import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ChatMessageWhereUniqueInputSchema } from './ChatMessageWhereUniqueInputSchema';
import { ChatMessageUpdateWithoutUserInputSchema } from './ChatMessageUpdateWithoutUserInputSchema';
import { ChatMessageUncheckedUpdateWithoutUserInputSchema } from './ChatMessageUncheckedUpdateWithoutUserInputSchema';
import { ChatMessageCreateWithoutUserInputSchema } from './ChatMessageCreateWithoutUserInputSchema';
import { ChatMessageUncheckedCreateWithoutUserInputSchema } from './ChatMessageUncheckedCreateWithoutUserInputSchema';

export const ChatMessageUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.ChatMessageUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => ChatMessageWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ChatMessageUpdateWithoutUserInputSchema),z.lazy(() => ChatMessageUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => ChatMessageCreateWithoutUserInputSchema),z.lazy(() => ChatMessageUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export default ChatMessageUpsertWithWhereUniqueWithoutUserInputSchema;
