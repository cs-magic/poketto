import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ChatMessageCreateWithoutConversationInputSchema } from './ChatMessageCreateWithoutConversationInputSchema';
import { ChatMessageUncheckedCreateWithoutConversationInputSchema } from './ChatMessageUncheckedCreateWithoutConversationInputSchema';
import { ChatMessageCreateOrConnectWithoutConversationInputSchema } from './ChatMessageCreateOrConnectWithoutConversationInputSchema';
import { ChatMessageUpsertWithWhereUniqueWithoutConversationInputSchema } from './ChatMessageUpsertWithWhereUniqueWithoutConversationInputSchema';
import { ChatMessageCreateManyConversationInputEnvelopeSchema } from './ChatMessageCreateManyConversationInputEnvelopeSchema';
import { ChatMessageWhereUniqueInputSchema } from './ChatMessageWhereUniqueInputSchema';
import { ChatMessageUpdateWithWhereUniqueWithoutConversationInputSchema } from './ChatMessageUpdateWithWhereUniqueWithoutConversationInputSchema';
import { ChatMessageUpdateManyWithWhereWithoutConversationInputSchema } from './ChatMessageUpdateManyWithWhereWithoutConversationInputSchema';
import { ChatMessageScalarWhereInputSchema } from './ChatMessageScalarWhereInputSchema';

export const ChatMessageUpdateManyWithoutConversationNestedInputSchema: z.ZodType<Prisma.ChatMessageUpdateManyWithoutConversationNestedInput> = z.object({
  create: z.union([ z.lazy(() => ChatMessageCreateWithoutConversationInputSchema),z.lazy(() => ChatMessageCreateWithoutConversationInputSchema).array(),z.lazy(() => ChatMessageUncheckedCreateWithoutConversationInputSchema),z.lazy(() => ChatMessageUncheckedCreateWithoutConversationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ChatMessageCreateOrConnectWithoutConversationInputSchema),z.lazy(() => ChatMessageCreateOrConnectWithoutConversationInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ChatMessageUpsertWithWhereUniqueWithoutConversationInputSchema),z.lazy(() => ChatMessageUpsertWithWhereUniqueWithoutConversationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ChatMessageCreateManyConversationInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ChatMessageWhereUniqueInputSchema),z.lazy(() => ChatMessageWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ChatMessageWhereUniqueInputSchema),z.lazy(() => ChatMessageWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ChatMessageWhereUniqueInputSchema),z.lazy(() => ChatMessageWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ChatMessageWhereUniqueInputSchema),z.lazy(() => ChatMessageWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ChatMessageUpdateWithWhereUniqueWithoutConversationInputSchema),z.lazy(() => ChatMessageUpdateWithWhereUniqueWithoutConversationInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ChatMessageUpdateManyWithWhereWithoutConversationInputSchema),z.lazy(() => ChatMessageUpdateManyWithWhereWithoutConversationInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ChatMessageScalarWhereInputSchema),z.lazy(() => ChatMessageScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default ChatMessageUpdateManyWithoutConversationNestedInputSchema;
