import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ChatMessageActionCreateWithoutUserInputSchema } from './ChatMessageActionCreateWithoutUserInputSchema';
import { ChatMessageActionUncheckedCreateWithoutUserInputSchema } from './ChatMessageActionUncheckedCreateWithoutUserInputSchema';
import { ChatMessageActionCreateOrConnectWithoutUserInputSchema } from './ChatMessageActionCreateOrConnectWithoutUserInputSchema';
import { ChatMessageActionUpsertWithWhereUniqueWithoutUserInputSchema } from './ChatMessageActionUpsertWithWhereUniqueWithoutUserInputSchema';
import { ChatMessageActionCreateManyUserInputEnvelopeSchema } from './ChatMessageActionCreateManyUserInputEnvelopeSchema';
import { ChatMessageActionWhereUniqueInputSchema } from './ChatMessageActionWhereUniqueInputSchema';
import { ChatMessageActionUpdateWithWhereUniqueWithoutUserInputSchema } from './ChatMessageActionUpdateWithWhereUniqueWithoutUserInputSchema';
import { ChatMessageActionUpdateManyWithWhereWithoutUserInputSchema } from './ChatMessageActionUpdateManyWithWhereWithoutUserInputSchema';
import { ChatMessageActionScalarWhereInputSchema } from './ChatMessageActionScalarWhereInputSchema';

export const ChatMessageActionUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.ChatMessageActionUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ChatMessageActionCreateWithoutUserInputSchema),z.lazy(() => ChatMessageActionCreateWithoutUserInputSchema).array(),z.lazy(() => ChatMessageActionUncheckedCreateWithoutUserInputSchema),z.lazy(() => ChatMessageActionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ChatMessageActionCreateOrConnectWithoutUserInputSchema),z.lazy(() => ChatMessageActionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ChatMessageActionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ChatMessageActionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ChatMessageActionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ChatMessageActionWhereUniqueInputSchema),z.lazy(() => ChatMessageActionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ChatMessageActionWhereUniqueInputSchema),z.lazy(() => ChatMessageActionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ChatMessageActionWhereUniqueInputSchema),z.lazy(() => ChatMessageActionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ChatMessageActionWhereUniqueInputSchema),z.lazy(() => ChatMessageActionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ChatMessageActionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ChatMessageActionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ChatMessageActionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => ChatMessageActionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ChatMessageActionScalarWhereInputSchema),z.lazy(() => ChatMessageActionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default ChatMessageActionUpdateManyWithoutUserNestedInputSchema;
