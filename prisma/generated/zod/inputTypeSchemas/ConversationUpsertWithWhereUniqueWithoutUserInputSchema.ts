import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ConversationWhereUniqueInputSchema } from './ConversationWhereUniqueInputSchema';
import { ConversationUpdateWithoutUserInputSchema } from './ConversationUpdateWithoutUserInputSchema';
import { ConversationUncheckedUpdateWithoutUserInputSchema } from './ConversationUncheckedUpdateWithoutUserInputSchema';
import { ConversationCreateWithoutUserInputSchema } from './ConversationCreateWithoutUserInputSchema';
import { ConversationUncheckedCreateWithoutUserInputSchema } from './ConversationUncheckedCreateWithoutUserInputSchema';

export const ConversationUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.ConversationUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => ConversationWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ConversationUpdateWithoutUserInputSchema),z.lazy(() => ConversationUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => ConversationCreateWithoutUserInputSchema),z.lazy(() => ConversationUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export default ConversationUpsertWithWhereUniqueWithoutUserInputSchema;
