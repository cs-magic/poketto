import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ChatMessageCreateInputSchema } from '../inputTypeSchemas/ChatMessageCreateInputSchema'
import { ChatMessageUncheckedCreateInputSchema } from '../inputTypeSchemas/ChatMessageUncheckedCreateInputSchema'

export const ChatMessageCreateArgsSchema: z.ZodType<Omit<Prisma.ChatMessageCreateArgs, "select" | "include">> = z.object({
  data: z.union([ ChatMessageCreateInputSchema,ChatMessageUncheckedCreateInputSchema ]),
}).strict()

export default ChatMessageCreateArgsSchema;
