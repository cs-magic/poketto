import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ChatMessageCreateWithoutUserActionOnMessageInputSchema } from './ChatMessageCreateWithoutUserActionOnMessageInputSchema';
import { ChatMessageUncheckedCreateWithoutUserActionOnMessageInputSchema } from './ChatMessageUncheckedCreateWithoutUserActionOnMessageInputSchema';
import { ChatMessageCreateOrConnectWithoutUserActionOnMessageInputSchema } from './ChatMessageCreateOrConnectWithoutUserActionOnMessageInputSchema';
import { ChatMessageUpsertWithoutUserActionOnMessageInputSchema } from './ChatMessageUpsertWithoutUserActionOnMessageInputSchema';
import { ChatMessageWhereUniqueInputSchema } from './ChatMessageWhereUniqueInputSchema';
import { ChatMessageUpdateToOneWithWhereWithoutUserActionOnMessageInputSchema } from './ChatMessageUpdateToOneWithWhereWithoutUserActionOnMessageInputSchema';
import { ChatMessageUpdateWithoutUserActionOnMessageInputSchema } from './ChatMessageUpdateWithoutUserActionOnMessageInputSchema';
import { ChatMessageUncheckedUpdateWithoutUserActionOnMessageInputSchema } from './ChatMessageUncheckedUpdateWithoutUserActionOnMessageInputSchema';

export const ChatMessageUpdateOneRequiredWithoutUserActionOnMessageNestedInputSchema: z.ZodType<Prisma.ChatMessageUpdateOneRequiredWithoutUserActionOnMessageNestedInput> = z.object({
  create: z.union([ z.lazy(() => ChatMessageCreateWithoutUserActionOnMessageInputSchema),z.lazy(() => ChatMessageUncheckedCreateWithoutUserActionOnMessageInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ChatMessageCreateOrConnectWithoutUserActionOnMessageInputSchema).optional(),
  upsert: z.lazy(() => ChatMessageUpsertWithoutUserActionOnMessageInputSchema).optional(),
  connect: z.lazy(() => ChatMessageWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ChatMessageUpdateToOneWithWhereWithoutUserActionOnMessageInputSchema),z.lazy(() => ChatMessageUpdateWithoutUserActionOnMessageInputSchema),z.lazy(() => ChatMessageUncheckedUpdateWithoutUserActionOnMessageInputSchema) ]).optional(),
}).strict();

export default ChatMessageUpdateOneRequiredWithoutUserActionOnMessageNestedInputSchema;
