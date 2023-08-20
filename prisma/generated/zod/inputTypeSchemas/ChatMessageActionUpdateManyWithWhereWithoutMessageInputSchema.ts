import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ChatMessageActionScalarWhereInputSchema } from './ChatMessageActionScalarWhereInputSchema';
import { ChatMessageActionUpdateManyMutationInputSchema } from './ChatMessageActionUpdateManyMutationInputSchema';
import { ChatMessageActionUncheckedUpdateManyWithoutMessageInputSchema } from './ChatMessageActionUncheckedUpdateManyWithoutMessageInputSchema';

export const ChatMessageActionUpdateManyWithWhereWithoutMessageInputSchema: z.ZodType<Prisma.ChatMessageActionUpdateManyWithWhereWithoutMessageInput> = z.object({
  where: z.lazy(() => ChatMessageActionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ChatMessageActionUpdateManyMutationInputSchema),z.lazy(() => ChatMessageActionUncheckedUpdateManyWithoutMessageInputSchema) ]),
}).strict();

export default ChatMessageActionUpdateManyWithWhereWithoutMessageInputSchema;
