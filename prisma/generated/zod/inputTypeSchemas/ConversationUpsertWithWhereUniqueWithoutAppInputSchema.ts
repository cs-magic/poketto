import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ConversationWhereUniqueInputSchema } from './ConversationWhereUniqueInputSchema';
import { ConversationUpdateWithoutAppInputSchema } from './ConversationUpdateWithoutAppInputSchema';
import { ConversationUncheckedUpdateWithoutAppInputSchema } from './ConversationUncheckedUpdateWithoutAppInputSchema';
import { ConversationCreateWithoutAppInputSchema } from './ConversationCreateWithoutAppInputSchema';
import { ConversationUncheckedCreateWithoutAppInputSchema } from './ConversationUncheckedCreateWithoutAppInputSchema';

export const ConversationUpsertWithWhereUniqueWithoutAppInputSchema: z.ZodType<Prisma.ConversationUpsertWithWhereUniqueWithoutAppInput> = z.object({
  where: z.lazy(() => ConversationWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ConversationUpdateWithoutAppInputSchema),z.lazy(() => ConversationUncheckedUpdateWithoutAppInputSchema) ]),
  create: z.union([ z.lazy(() => ConversationCreateWithoutAppInputSchema),z.lazy(() => ConversationUncheckedCreateWithoutAppInputSchema) ]),
}).strict();

export default ConversationUpsertWithWhereUniqueWithoutAppInputSchema;
