import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ConversationScalarWhereInputSchema } from './ConversationScalarWhereInputSchema';
import { ConversationUpdateManyMutationInputSchema } from './ConversationUpdateManyMutationInputSchema';
import { ConversationUncheckedUpdateManyWithoutAppInputSchema } from './ConversationUncheckedUpdateManyWithoutAppInputSchema';

export const ConversationUpdateManyWithWhereWithoutAppInputSchema: z.ZodType<Prisma.ConversationUpdateManyWithWhereWithoutAppInput> = z.object({
  where: z.lazy(() => ConversationScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ConversationUpdateManyMutationInputSchema),z.lazy(() => ConversationUncheckedUpdateManyWithoutAppInputSchema) ]),
}).strict();

export default ConversationUpdateManyWithWhereWithoutAppInputSchema;
