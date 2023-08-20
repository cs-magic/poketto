import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ChatMessageActionWhereUniqueInputSchema } from '../inputTypeSchemas/ChatMessageActionWhereUniqueInputSchema'

export const ChatMessageActionFindUniqueOrThrowArgsSchema: z.ZodType<Omit<Prisma.ChatMessageActionFindUniqueOrThrowArgs, "select" | "include">> = z.object({
  where: ChatMessageActionWhereUniqueInputSchema,
}).strict()

export default ChatMessageActionFindUniqueOrThrowArgsSchema;
