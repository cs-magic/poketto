import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ConversationCreateWithoutAppInputSchema } from './ConversationCreateWithoutAppInputSchema';
import { ConversationUncheckedCreateWithoutAppInputSchema } from './ConversationUncheckedCreateWithoutAppInputSchema';
import { ConversationCreateOrConnectWithoutAppInputSchema } from './ConversationCreateOrConnectWithoutAppInputSchema';
import { ConversationCreateManyAppInputEnvelopeSchema } from './ConversationCreateManyAppInputEnvelopeSchema';
import { ConversationWhereUniqueInputSchema } from './ConversationWhereUniqueInputSchema';

export const ConversationCreateNestedManyWithoutAppInputSchema: z.ZodType<Prisma.ConversationCreateNestedManyWithoutAppInput> = z.object({
  create: z.union([ z.lazy(() => ConversationCreateWithoutAppInputSchema),z.lazy(() => ConversationCreateWithoutAppInputSchema).array(),z.lazy(() => ConversationUncheckedCreateWithoutAppInputSchema),z.lazy(() => ConversationUncheckedCreateWithoutAppInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ConversationCreateOrConnectWithoutAppInputSchema),z.lazy(() => ConversationCreateOrConnectWithoutAppInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ConversationCreateManyAppInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ConversationWhereUniqueInputSchema),z.lazy(() => ConversationWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default ConversationCreateNestedManyWithoutAppInputSchema;
