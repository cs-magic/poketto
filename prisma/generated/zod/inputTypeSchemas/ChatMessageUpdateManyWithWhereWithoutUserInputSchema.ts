import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ChatMessageScalarWhereInputSchema } from './ChatMessageScalarWhereInputSchema';
import { ChatMessageUpdateManyMutationInputSchema } from './ChatMessageUpdateManyMutationInputSchema';
import { ChatMessageUncheckedUpdateManyWithoutUserInputSchema } from './ChatMessageUncheckedUpdateManyWithoutUserInputSchema';

export const ChatMessageUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.ChatMessageUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => ChatMessageScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ChatMessageUpdateManyMutationInputSchema),z.lazy(() => ChatMessageUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export default ChatMessageUpdateManyWithWhereWithoutUserInputSchema;
