import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ChatMessageCreateWithoutConversationInputSchema } from './ChatMessageCreateWithoutConversationInputSchema';
import { ChatMessageUncheckedCreateWithoutConversationInputSchema } from './ChatMessageUncheckedCreateWithoutConversationInputSchema';
import { ChatMessageCreateOrConnectWithoutConversationInputSchema } from './ChatMessageCreateOrConnectWithoutConversationInputSchema';
import { ChatMessageCreateManyConversationInputEnvelopeSchema } from './ChatMessageCreateManyConversationInputEnvelopeSchema';
import { ChatMessageWhereUniqueInputSchema } from './ChatMessageWhereUniqueInputSchema';

export const ChatMessageCreateNestedManyWithoutConversationInputSchema: z.ZodType<Prisma.ChatMessageCreateNestedManyWithoutConversationInput> = z.object({
  create: z.union([ z.lazy(() => ChatMessageCreateWithoutConversationInputSchema),z.lazy(() => ChatMessageCreateWithoutConversationInputSchema).array(),z.lazy(() => ChatMessageUncheckedCreateWithoutConversationInputSchema),z.lazy(() => ChatMessageUncheckedCreateWithoutConversationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ChatMessageCreateOrConnectWithoutConversationInputSchema),z.lazy(() => ChatMessageCreateOrConnectWithoutConversationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ChatMessageCreateManyConversationInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ChatMessageWhereUniqueInputSchema),z.lazy(() => ChatMessageWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default ChatMessageCreateNestedManyWithoutConversationInputSchema;
