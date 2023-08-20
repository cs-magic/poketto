import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ChatMessageWhereUniqueInputSchema } from '../inputTypeSchemas/ChatMessageWhereUniqueInputSchema'

export const ChatMessageFindUniqueArgsSchema: z.ZodType<Omit<Prisma.ChatMessageFindUniqueArgs, "select" | "include">> = z.object({
  where: ChatMessageWhereUniqueInputSchema,
}).strict()

export default ChatMessageFindUniqueArgsSchema;
