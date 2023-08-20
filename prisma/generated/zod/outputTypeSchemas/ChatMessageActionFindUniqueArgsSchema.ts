import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ChatMessageActionWhereUniqueInputSchema } from '../inputTypeSchemas/ChatMessageActionWhereUniqueInputSchema'

export const ChatMessageActionFindUniqueArgsSchema: z.ZodType<Omit<Prisma.ChatMessageActionFindUniqueArgs, "select" | "include">> = z.object({
  where: ChatMessageActionWhereUniqueInputSchema,
}).strict()

export default ChatMessageActionFindUniqueArgsSchema;
