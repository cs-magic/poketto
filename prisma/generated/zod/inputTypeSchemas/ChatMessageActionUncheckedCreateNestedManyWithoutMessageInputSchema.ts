import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ChatMessageActionCreateWithoutMessageInputSchema } from './ChatMessageActionCreateWithoutMessageInputSchema';
import { ChatMessageActionUncheckedCreateWithoutMessageInputSchema } from './ChatMessageActionUncheckedCreateWithoutMessageInputSchema';
import { ChatMessageActionCreateOrConnectWithoutMessageInputSchema } from './ChatMessageActionCreateOrConnectWithoutMessageInputSchema';
import { ChatMessageActionCreateManyMessageInputEnvelopeSchema } from './ChatMessageActionCreateManyMessageInputEnvelopeSchema';
import { ChatMessageActionWhereUniqueInputSchema } from './ChatMessageActionWhereUniqueInputSchema';

export const ChatMessageActionUncheckedCreateNestedManyWithoutMessageInputSchema: z.ZodType<Prisma.ChatMessageActionUncheckedCreateNestedManyWithoutMessageInput> = z.object({
  create: z.union([ z.lazy(() => ChatMessageActionCreateWithoutMessageInputSchema),z.lazy(() => ChatMessageActionCreateWithoutMessageInputSchema).array(),z.lazy(() => ChatMessageActionUncheckedCreateWithoutMessageInputSchema),z.lazy(() => ChatMessageActionUncheckedCreateWithoutMessageInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ChatMessageActionCreateOrConnectWithoutMessageInputSchema),z.lazy(() => ChatMessageActionCreateOrConnectWithoutMessageInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ChatMessageActionCreateManyMessageInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ChatMessageActionWhereUniqueInputSchema),z.lazy(() => ChatMessageActionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default ChatMessageActionUncheckedCreateNestedManyWithoutMessageInputSchema;
