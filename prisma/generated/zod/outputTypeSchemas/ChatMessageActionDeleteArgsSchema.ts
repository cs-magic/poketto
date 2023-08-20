import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ChatMessageActionWhereUniqueInputSchema } from '../inputTypeSchemas/ChatMessageActionWhereUniqueInputSchema'

export const ChatMessageActionDeleteArgsSchema: z.ZodType<Omit<Prisma.ChatMessageActionDeleteArgs, "select" | "include">> = z.object({
  where: ChatMessageActionWhereUniqueInputSchema,
}).strict()

export default ChatMessageActionDeleteArgsSchema;
