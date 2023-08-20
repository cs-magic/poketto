import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ConversationWhereUniqueInputSchema } from './ConversationWhereUniqueInputSchema';
import { ConversationUpdateWithoutUserInputSchema } from './ConversationUpdateWithoutUserInputSchema';
import { ConversationUncheckedUpdateWithoutUserInputSchema } from './ConversationUncheckedUpdateWithoutUserInputSchema';

export const ConversationUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.ConversationUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => ConversationWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ConversationUpdateWithoutUserInputSchema),z.lazy(() => ConversationUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export default ConversationUpdateWithWhereUniqueWithoutUserInputSchema;
