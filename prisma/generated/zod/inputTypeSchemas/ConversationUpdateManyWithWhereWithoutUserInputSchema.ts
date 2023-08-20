import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ConversationScalarWhereInputSchema } from './ConversationScalarWhereInputSchema';
import { ConversationUpdateManyMutationInputSchema } from './ConversationUpdateManyMutationInputSchema';
import { ConversationUncheckedUpdateManyWithoutUserInputSchema } from './ConversationUncheckedUpdateManyWithoutUserInputSchema';

export const ConversationUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.ConversationUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => ConversationScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ConversationUpdateManyMutationInputSchema),z.lazy(() => ConversationUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export default ConversationUpdateManyWithWhereWithoutUserInputSchema;
