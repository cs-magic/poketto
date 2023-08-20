import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ChatMessageActionCreateWithoutUserInputSchema } from './ChatMessageActionCreateWithoutUserInputSchema';
import { ChatMessageActionUncheckedCreateWithoutUserInputSchema } from './ChatMessageActionUncheckedCreateWithoutUserInputSchema';
import { ChatMessageActionCreateOrConnectWithoutUserInputSchema } from './ChatMessageActionCreateOrConnectWithoutUserInputSchema';
import { ChatMessageActionCreateManyUserInputEnvelopeSchema } from './ChatMessageActionCreateManyUserInputEnvelopeSchema';
import { ChatMessageActionWhereUniqueInputSchema } from './ChatMessageActionWhereUniqueInputSchema';

export const ChatMessageActionCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.ChatMessageActionCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => ChatMessageActionCreateWithoutUserInputSchema),z.lazy(() => ChatMessageActionCreateWithoutUserInputSchema).array(),z.lazy(() => ChatMessageActionUncheckedCreateWithoutUserInputSchema),z.lazy(() => ChatMessageActionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ChatMessageActionCreateOrConnectWithoutUserInputSchema),z.lazy(() => ChatMessageActionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ChatMessageActionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ChatMessageActionWhereUniqueInputSchema),z.lazy(() => ChatMessageActionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default ChatMessageActionCreateNestedManyWithoutUserInputSchema;
