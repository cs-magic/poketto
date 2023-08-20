import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ConversationCreateWithoutUserInputSchema } from './ConversationCreateWithoutUserInputSchema';
import { ConversationUncheckedCreateWithoutUserInputSchema } from './ConversationUncheckedCreateWithoutUserInputSchema';
import { ConversationCreateOrConnectWithoutUserInputSchema } from './ConversationCreateOrConnectWithoutUserInputSchema';
import { ConversationUpsertWithWhereUniqueWithoutUserInputSchema } from './ConversationUpsertWithWhereUniqueWithoutUserInputSchema';
import { ConversationCreateManyUserInputEnvelopeSchema } from './ConversationCreateManyUserInputEnvelopeSchema';
import { ConversationWhereUniqueInputSchema } from './ConversationWhereUniqueInputSchema';
import { ConversationUpdateWithWhereUniqueWithoutUserInputSchema } from './ConversationUpdateWithWhereUniqueWithoutUserInputSchema';
import { ConversationUpdateManyWithWhereWithoutUserInputSchema } from './ConversationUpdateManyWithWhereWithoutUserInputSchema';
import { ConversationScalarWhereInputSchema } from './ConversationScalarWhereInputSchema';

export const ConversationUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.ConversationUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ConversationCreateWithoutUserInputSchema),z.lazy(() => ConversationCreateWithoutUserInputSchema).array(),z.lazy(() => ConversationUncheckedCreateWithoutUserInputSchema),z.lazy(() => ConversationUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ConversationCreateOrConnectWithoutUserInputSchema),z.lazy(() => ConversationCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ConversationUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ConversationUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ConversationCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ConversationWhereUniqueInputSchema),z.lazy(() => ConversationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ConversationWhereUniqueInputSchema),z.lazy(() => ConversationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ConversationWhereUniqueInputSchema),z.lazy(() => ConversationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ConversationWhereUniqueInputSchema),z.lazy(() => ConversationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ConversationUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ConversationUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ConversationUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => ConversationUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ConversationScalarWhereInputSchema),z.lazy(() => ConversationScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default ConversationUncheckedUpdateManyWithoutUserNestedInputSchema;
