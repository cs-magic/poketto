import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ChatMessageCreateWithoutUserInputSchema } from './ChatMessageCreateWithoutUserInputSchema';
import { ChatMessageUncheckedCreateWithoutUserInputSchema } from './ChatMessageUncheckedCreateWithoutUserInputSchema';
import { ChatMessageCreateOrConnectWithoutUserInputSchema } from './ChatMessageCreateOrConnectWithoutUserInputSchema';
import { ChatMessageCreateManyUserInputEnvelopeSchema } from './ChatMessageCreateManyUserInputEnvelopeSchema';
import { ChatMessageWhereUniqueInputSchema } from './ChatMessageWhereUniqueInputSchema';

export const ChatMessageCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.ChatMessageCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => ChatMessageCreateWithoutUserInputSchema),z.lazy(() => ChatMessageCreateWithoutUserInputSchema).array(),z.lazy(() => ChatMessageUncheckedCreateWithoutUserInputSchema),z.lazy(() => ChatMessageUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ChatMessageCreateOrConnectWithoutUserInputSchema),z.lazy(() => ChatMessageCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ChatMessageCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ChatMessageWhereUniqueInputSchema),z.lazy(() => ChatMessageWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default ChatMessageCreateNestedManyWithoutUserInputSchema;
