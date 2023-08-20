import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ChatMessageActionWhereUniqueInputSchema } from './ChatMessageActionWhereUniqueInputSchema';
import { ChatMessageActionUpdateWithoutUserInputSchema } from './ChatMessageActionUpdateWithoutUserInputSchema';
import { ChatMessageActionUncheckedUpdateWithoutUserInputSchema } from './ChatMessageActionUncheckedUpdateWithoutUserInputSchema';
import { ChatMessageActionCreateWithoutUserInputSchema } from './ChatMessageActionCreateWithoutUserInputSchema';
import { ChatMessageActionUncheckedCreateWithoutUserInputSchema } from './ChatMessageActionUncheckedCreateWithoutUserInputSchema';

export const ChatMessageActionUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.ChatMessageActionUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => ChatMessageActionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ChatMessageActionUpdateWithoutUserInputSchema),z.lazy(() => ChatMessageActionUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => ChatMessageActionCreateWithoutUserInputSchema),z.lazy(() => ChatMessageActionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export default ChatMessageActionUpsertWithWhereUniqueWithoutUserInputSchema;
