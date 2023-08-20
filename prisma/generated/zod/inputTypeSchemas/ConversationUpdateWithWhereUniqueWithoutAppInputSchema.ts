import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ConversationWhereUniqueInputSchema } from './ConversationWhereUniqueInputSchema';
import { ConversationUpdateWithoutAppInputSchema } from './ConversationUpdateWithoutAppInputSchema';
import { ConversationUncheckedUpdateWithoutAppInputSchema } from './ConversationUncheckedUpdateWithoutAppInputSchema';

export const ConversationUpdateWithWhereUniqueWithoutAppInputSchema: z.ZodType<Prisma.ConversationUpdateWithWhereUniqueWithoutAppInput> = z.object({
  where: z.lazy(() => ConversationWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ConversationUpdateWithoutAppInputSchema),z.lazy(() => ConversationUncheckedUpdateWithoutAppInputSchema) ]),
}).strict();

export default ConversationUpdateWithWhereUniqueWithoutAppInputSchema;
