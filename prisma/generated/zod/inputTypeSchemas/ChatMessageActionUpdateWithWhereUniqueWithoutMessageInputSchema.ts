import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ChatMessageActionWhereUniqueInputSchema } from './ChatMessageActionWhereUniqueInputSchema';
import { ChatMessageActionUpdateWithoutMessageInputSchema } from './ChatMessageActionUpdateWithoutMessageInputSchema';
import { ChatMessageActionUncheckedUpdateWithoutMessageInputSchema } from './ChatMessageActionUncheckedUpdateWithoutMessageInputSchema';

export const ChatMessageActionUpdateWithWhereUniqueWithoutMessageInputSchema: z.ZodType<Prisma.ChatMessageActionUpdateWithWhereUniqueWithoutMessageInput> = z.object({
  where: z.lazy(() => ChatMessageActionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ChatMessageActionUpdateWithoutMessageInputSchema),z.lazy(() => ChatMessageActionUncheckedUpdateWithoutMessageInputSchema) ]),
}).strict();

export default ChatMessageActionUpdateWithWhereUniqueWithoutMessageInputSchema;
