import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ChatMessageWhereInputSchema } from '../inputTypeSchemas/ChatMessageWhereInputSchema'

export const ChatMessageDeleteManyArgsSchema: z.ZodType<Prisma.ChatMessageDeleteManyArgs> = z.object({
  where: ChatMessageWhereInputSchema.optional(),
}).strict()

export default ChatMessageDeleteManyArgsSchema;
