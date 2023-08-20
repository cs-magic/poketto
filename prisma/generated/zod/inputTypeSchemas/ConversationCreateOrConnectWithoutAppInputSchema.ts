import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ConversationWhereUniqueInputSchema } from './ConversationWhereUniqueInputSchema';
import { ConversationCreateWithoutAppInputSchema } from './ConversationCreateWithoutAppInputSchema';
import { ConversationUncheckedCreateWithoutAppInputSchema } from './ConversationUncheckedCreateWithoutAppInputSchema';

export const ConversationCreateOrConnectWithoutAppInputSchema: z.ZodType<Prisma.ConversationCreateOrConnectWithoutAppInput> = z.object({
  where: z.lazy(() => ConversationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ConversationCreateWithoutAppInputSchema),z.lazy(() => ConversationUncheckedCreateWithoutAppInputSchema) ]),
}).strict();

export default ConversationCreateOrConnectWithoutAppInputSchema;
