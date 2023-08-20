import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ConversationCreateWithoutAppInputSchema } from './ConversationCreateWithoutAppInputSchema';
import { ConversationUncheckedCreateWithoutAppInputSchema } from './ConversationUncheckedCreateWithoutAppInputSchema';
import { ConversationCreateOrConnectWithoutAppInputSchema } from './ConversationCreateOrConnectWithoutAppInputSchema';
import { ConversationUpsertWithWhereUniqueWithoutAppInputSchema } from './ConversationUpsertWithWhereUniqueWithoutAppInputSchema';
import { ConversationCreateManyAppInputEnvelopeSchema } from './ConversationCreateManyAppInputEnvelopeSchema';
import { ConversationWhereUniqueInputSchema } from './ConversationWhereUniqueInputSchema';
import { ConversationUpdateWithWhereUniqueWithoutAppInputSchema } from './ConversationUpdateWithWhereUniqueWithoutAppInputSchema';
import { ConversationUpdateManyWithWhereWithoutAppInputSchema } from './ConversationUpdateManyWithWhereWithoutAppInputSchema';
import { ConversationScalarWhereInputSchema } from './ConversationScalarWhereInputSchema';

export const ConversationUncheckedUpdateManyWithoutAppNestedInputSchema: z.ZodType<Prisma.ConversationUncheckedUpdateManyWithoutAppNestedInput> = z.object({
  create: z.union([ z.lazy(() => ConversationCreateWithoutAppInputSchema),z.lazy(() => ConversationCreateWithoutAppInputSchema).array(),z.lazy(() => ConversationUncheckedCreateWithoutAppInputSchema),z.lazy(() => ConversationUncheckedCreateWithoutAppInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ConversationCreateOrConnectWithoutAppInputSchema),z.lazy(() => ConversationCreateOrConnectWithoutAppInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ConversationUpsertWithWhereUniqueWithoutAppInputSchema),z.lazy(() => ConversationUpsertWithWhereUniqueWithoutAppInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ConversationCreateManyAppInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ConversationWhereUniqueInputSchema),z.lazy(() => ConversationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ConversationWhereUniqueInputSchema),z.lazy(() => ConversationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ConversationWhereUniqueInputSchema),z.lazy(() => ConversationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ConversationWhereUniqueInputSchema),z.lazy(() => ConversationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ConversationUpdateWithWhereUniqueWithoutAppInputSchema),z.lazy(() => ConversationUpdateWithWhereUniqueWithoutAppInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ConversationUpdateManyWithWhereWithoutAppInputSchema),z.lazy(() => ConversationUpdateManyWithWhereWithoutAppInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ConversationScalarWhereInputSchema),z.lazy(() => ConversationScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default ConversationUncheckedUpdateManyWithoutAppNestedInputSchema;
