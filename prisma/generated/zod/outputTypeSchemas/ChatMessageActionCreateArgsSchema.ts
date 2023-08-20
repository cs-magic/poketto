import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ChatMessageActionCreateInputSchema } from '../inputTypeSchemas/ChatMessageActionCreateInputSchema'
import { ChatMessageActionUncheckedCreateInputSchema } from '../inputTypeSchemas/ChatMessageActionUncheckedCreateInputSchema'

export const ChatMessageActionCreateArgsSchema: z.ZodType<Omit<Prisma.ChatMessageActionCreateArgs, "select" | "include">> = z.object({
  data: z.union([ ChatMessageActionCreateInputSchema,ChatMessageActionUncheckedCreateInputSchema ]),
}).strict()

export default ChatMessageActionCreateArgsSchema;
