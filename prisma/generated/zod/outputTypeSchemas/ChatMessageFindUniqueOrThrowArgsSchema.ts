import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ChatMessageWhereUniqueInputSchema } from '../inputTypeSchemas/ChatMessageWhereUniqueInputSchema'

export const ChatMessageFindUniqueOrThrowArgsSchema: z.ZodType<Omit<Prisma.ChatMessageFindUniqueOrThrowArgs, "select" | "include">> = z.object({
  where: ChatMessageWhereUniqueInputSchema,
}).strict()

export default ChatMessageFindUniqueOrThrowArgsSchema;
