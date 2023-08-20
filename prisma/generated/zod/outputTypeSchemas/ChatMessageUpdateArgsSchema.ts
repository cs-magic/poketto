import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ChatMessageUpdateInputSchema } from '../inputTypeSchemas/ChatMessageUpdateInputSchema'
import { ChatMessageUncheckedUpdateInputSchema } from '../inputTypeSchemas/ChatMessageUncheckedUpdateInputSchema'
import { ChatMessageWhereUniqueInputSchema } from '../inputTypeSchemas/ChatMessageWhereUniqueInputSchema'

export const ChatMessageUpdateArgsSchema: z.ZodType<Omit<Prisma.ChatMessageUpdateArgs, "select" | "include">> = z.object({
  data: z.union([ ChatMessageUpdateInputSchema,ChatMessageUncheckedUpdateInputSchema ]),
  where: ChatMessageWhereUniqueInputSchema,
}).strict()

export default ChatMessageUpdateArgsSchema;
