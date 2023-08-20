import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ChatMessageActionWhereInputSchema } from '../inputTypeSchemas/ChatMessageActionWhereInputSchema'

export const ChatMessageActionDeleteManyArgsSchema: z.ZodType<Prisma.ChatMessageActionDeleteManyArgs> = z.object({
  where: ChatMessageActionWhereInputSchema.optional(),
}).strict()

export default ChatMessageActionDeleteManyArgsSchema;
