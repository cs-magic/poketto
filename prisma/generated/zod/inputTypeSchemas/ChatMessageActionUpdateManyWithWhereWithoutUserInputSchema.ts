import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ChatMessageActionScalarWhereInputSchema } from './ChatMessageActionScalarWhereInputSchema';
import { ChatMessageActionUpdateManyMutationInputSchema } from './ChatMessageActionUpdateManyMutationInputSchema';
import { ChatMessageActionUncheckedUpdateManyWithoutUserInputSchema } from './ChatMessageActionUncheckedUpdateManyWithoutUserInputSchema';

export const ChatMessageActionUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.ChatMessageActionUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => ChatMessageActionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ChatMessageActionUpdateManyMutationInputSchema),z.lazy(() => ChatMessageActionUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export default ChatMessageActionUpdateManyWithWhereWithoutUserInputSchema;
