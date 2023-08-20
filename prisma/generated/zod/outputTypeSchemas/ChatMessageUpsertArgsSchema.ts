import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ChatMessageWhereUniqueInputSchema } from '../inputTypeSchemas/ChatMessageWhereUniqueInputSchema'
import { ChatMessageCreateInputSchema } from '../inputTypeSchemas/ChatMessageCreateInputSchema'
import { ChatMessageUncheckedCreateInputSchema } from '../inputTypeSchemas/ChatMessageUncheckedCreateInputSchema'
import { ChatMessageUpdateInputSchema } from '../inputTypeSchemas/ChatMessageUpdateInputSchema'
import { ChatMessageUncheckedUpdateInputSchema } from '../inputTypeSchemas/ChatMessageUncheckedUpdateInputSchema'

export const ChatMessageUpsertArgsSchema: z.ZodType<Omit<Prisma.ChatMessageUpsertArgs, "select" | "include">> = z.object({
  where: ChatMessageWhereUniqueInputSchema,
  create: z.union([ ChatMessageCreateInputSchema,ChatMessageUncheckedCreateInputSchema ]),
  update: z.union([ ChatMessageUpdateInputSchema,ChatMessageUncheckedUpdateInputSchema ]),
}).strict()

export default ChatMessageUpsertArgsSchema;
