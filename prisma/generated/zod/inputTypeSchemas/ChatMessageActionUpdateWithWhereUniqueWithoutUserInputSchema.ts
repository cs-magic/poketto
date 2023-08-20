import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ChatMessageActionWhereUniqueInputSchema } from './ChatMessageActionWhereUniqueInputSchema';
import { ChatMessageActionUpdateWithoutUserInputSchema } from './ChatMessageActionUpdateWithoutUserInputSchema';
import { ChatMessageActionUncheckedUpdateWithoutUserInputSchema } from './ChatMessageActionUncheckedUpdateWithoutUserInputSchema';

export const ChatMessageActionUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.ChatMessageActionUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => ChatMessageActionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ChatMessageActionUpdateWithoutUserInputSchema),z.lazy(() => ChatMessageActionUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export default ChatMessageActionUpdateWithWhereUniqueWithoutUserInputSchema;
