import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ConversationWhereUniqueInputSchema } from './ConversationWhereUniqueInputSchema';
import { ConversationCreateWithoutUserInputSchema } from './ConversationCreateWithoutUserInputSchema';
import { ConversationUncheckedCreateWithoutUserInputSchema } from './ConversationUncheckedCreateWithoutUserInputSchema';

export const ConversationCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.ConversationCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => ConversationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ConversationCreateWithoutUserInputSchema),z.lazy(() => ConversationUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export default ConversationCreateOrConnectWithoutUserInputSchema;
