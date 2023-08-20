import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ChatMessageCreateWithoutUserInputSchema } from './ChatMessageCreateWithoutUserInputSchema';
import { ChatMessageUncheckedCreateWithoutUserInputSchema } from './ChatMessageUncheckedCreateWithoutUserInputSchema';
import { ChatMessageCreateOrConnectWithoutUserInputSchema } from './ChatMessageCreateOrConnectWithoutUserInputSchema';
import { ChatMessageUpsertWithWhereUniqueWithoutUserInputSchema } from './ChatMessageUpsertWithWhereUniqueWithoutUserInputSchema';
import { ChatMessageCreateManyUserInputEnvelopeSchema } from './ChatMessageCreateManyUserInputEnvelopeSchema';
import { ChatMessageWhereUniqueInputSchema } from './ChatMessageWhereUniqueInputSchema';
import { ChatMessageUpdateWithWhereUniqueWithoutUserInputSchema } from './ChatMessageUpdateWithWhereUniqueWithoutUserInputSchema';
import { ChatMessageUpdateManyWithWhereWithoutUserInputSchema } from './ChatMessageUpdateManyWithWhereWithoutUserInputSchema';
import { ChatMessageScalarWhereInputSchema } from './ChatMessageScalarWhereInputSchema';

export const ChatMessageUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.ChatMessageUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ChatMessageCreateWithoutUserInputSchema),z.lazy(() => ChatMessageCreateWithoutUserInputSchema).array(),z.lazy(() => ChatMessageUncheckedCreateWithoutUserInputSchema),z.lazy(() => ChatMessageUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ChatMessageCreateOrConnectWithoutUserInputSchema),z.lazy(() => ChatMessageCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ChatMessageUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ChatMessageUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ChatMessageCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ChatMessageWhereUniqueInputSchema),z.lazy(() => ChatMessageWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ChatMessageWhereUniqueInputSchema),z.lazy(() => ChatMessageWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ChatMessageWhereUniqueInputSchema),z.lazy(() => ChatMessageWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ChatMessageWhereUniqueInputSchema),z.lazy(() => ChatMessageWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ChatMessageUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ChatMessageUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ChatMessageUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => ChatMessageUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ChatMessageScalarWhereInputSchema),z.lazy(() => ChatMessageScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default ChatMessageUncheckedUpdateManyWithoutUserNestedInputSchema;
