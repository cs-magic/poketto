import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ChatMessageWhereUniqueInputSchema } from '../inputTypeSchemas/ChatMessageWhereUniqueInputSchema'

export const ChatMessageDeleteArgsSchema: z.ZodType<Omit<Prisma.ChatMessageDeleteArgs, "select" | "include">> = z.object({
  where: ChatMessageWhereUniqueInputSchema,
}).strict()

export default ChatMessageDeleteArgsSchema;
