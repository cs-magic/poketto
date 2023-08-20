import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ChatMessageActionCreateWithoutMessageInputSchema } from './ChatMessageActionCreateWithoutMessageInputSchema';
import { ChatMessageActionUncheckedCreateWithoutMessageInputSchema } from './ChatMessageActionUncheckedCreateWithoutMessageInputSchema';
import { ChatMessageActionCreateOrConnectWithoutMessageInputSchema } from './ChatMessageActionCreateOrConnectWithoutMessageInputSchema';
import { ChatMessageActionUpsertWithWhereUniqueWithoutMessageInputSchema } from './ChatMessageActionUpsertWithWhereUniqueWithoutMessageInputSchema';
import { ChatMessageActionCreateManyMessageInputEnvelopeSchema } from './ChatMessageActionCreateManyMessageInputEnvelopeSchema';
import { ChatMessageActionWhereUniqueInputSchema } from './ChatMessageActionWhereUniqueInputSchema';
import { ChatMessageActionUpdateWithWhereUniqueWithoutMessageInputSchema } from './ChatMessageActionUpdateWithWhereUniqueWithoutMessageInputSchema';
import { ChatMessageActionUpdateManyWithWhereWithoutMessageInputSchema } from './ChatMessageActionUpdateManyWithWhereWithoutMessageInputSchema';
import { ChatMessageActionScalarWhereInputSchema } from './ChatMessageActionScalarWhereInputSchema';

export const ChatMessageActionUpdateManyWithoutMessageNestedInputSchema: z.ZodType<Prisma.ChatMessageActionUpdateManyWithoutMessageNestedInput> = z.object({
  create: z.union([ z.lazy(() => ChatMessageActionCreateWithoutMessageInputSchema),z.lazy(() => ChatMessageActionCreateWithoutMessageInputSchema).array(),z.lazy(() => ChatMessageActionUncheckedCreateWithoutMessageInputSchema),z.lazy(() => ChatMessageActionUncheckedCreateWithoutMessageInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ChatMessageActionCreateOrConnectWithoutMessageInputSchema),z.lazy(() => ChatMessageActionCreateOrConnectWithoutMessageInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ChatMessageActionUpsertWithWhereUniqueWithoutMessageInputSchema),z.lazy(() => ChatMessageActionUpsertWithWhereUniqueWithoutMessageInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ChatMessageActionCreateManyMessageInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ChatMessageActionWhereUniqueInputSchema),z.lazy(() => ChatMessageActionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ChatMessageActionWhereUniqueInputSchema),z.lazy(() => ChatMessageActionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ChatMessageActionWhereUniqueInputSchema),z.lazy(() => ChatMessageActionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ChatMessageActionWhereUniqueInputSchema),z.lazy(() => ChatMessageActionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ChatMessageActionUpdateWithWhereUniqueWithoutMessageInputSchema),z.lazy(() => ChatMessageActionUpdateWithWhereUniqueWithoutMessageInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ChatMessageActionUpdateManyWithWhereWithoutMessageInputSchema),z.lazy(() => ChatMessageActionUpdateManyWithWhereWithoutMessageInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ChatMessageActionScalarWhereInputSchema),z.lazy(() => ChatMessageActionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default ChatMessageActionUpdateManyWithoutMessageNestedInputSchema;
