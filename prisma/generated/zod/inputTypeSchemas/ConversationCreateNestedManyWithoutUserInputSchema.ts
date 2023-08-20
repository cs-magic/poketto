import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ConversationCreateWithoutUserInputSchema } from './ConversationCreateWithoutUserInputSchema';
import { ConversationUncheckedCreateWithoutUserInputSchema } from './ConversationUncheckedCreateWithoutUserInputSchema';
import { ConversationCreateOrConnectWithoutUserInputSchema } from './ConversationCreateOrConnectWithoutUserInputSchema';
import { ConversationCreateManyUserInputEnvelopeSchema } from './ConversationCreateManyUserInputEnvelopeSchema';
import { ConversationWhereUniqueInputSchema } from './ConversationWhereUniqueInputSchema';

export const ConversationCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.ConversationCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => ConversationCreateWithoutUserInputSchema),z.lazy(() => ConversationCreateWithoutUserInputSchema).array(),z.lazy(() => ConversationUncheckedCreateWithoutUserInputSchema),z.lazy(() => ConversationUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ConversationCreateOrConnectWithoutUserInputSchema),z.lazy(() => ConversationCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ConversationCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ConversationWhereUniqueInputSchema),z.lazy(() => ConversationWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default ConversationCreateNestedManyWithoutUserInputSchema;
