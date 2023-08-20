import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ChatMessageActionWhereUniqueInputSchema } from './ChatMessageActionWhereUniqueInputSchema';
import { ChatMessageActionUpdateWithoutMessageInputSchema } from './ChatMessageActionUpdateWithoutMessageInputSchema';
import { ChatMessageActionUncheckedUpdateWithoutMessageInputSchema } from './ChatMessageActionUncheckedUpdateWithoutMessageInputSchema';
import { ChatMessageActionCreateWithoutMessageInputSchema } from './ChatMessageActionCreateWithoutMessageInputSchema';
import { ChatMessageActionUncheckedCreateWithoutMessageInputSchema } from './ChatMessageActionUncheckedCreateWithoutMessageInputSchema';

export const ChatMessageActionUpsertWithWhereUniqueWithoutMessageInputSchema: z.ZodType<Prisma.ChatMessageActionUpsertWithWhereUniqueWithoutMessageInput> = z.object({
  where: z.lazy(() => ChatMessageActionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ChatMessageActionUpdateWithoutMessageInputSchema),z.lazy(() => ChatMessageActionUncheckedUpdateWithoutMessageInputSchema) ]),
  create: z.union([ z.lazy(() => ChatMessageActionCreateWithoutMessageInputSchema),z.lazy(() => ChatMessageActionUncheckedCreateWithoutMessageInputSchema) ]),
}).strict();

export default ChatMessageActionUpsertWithWhereUniqueWithoutMessageInputSchema;
