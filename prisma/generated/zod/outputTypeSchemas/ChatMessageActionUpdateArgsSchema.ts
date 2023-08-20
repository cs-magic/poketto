import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ChatMessageActionUpdateInputSchema } from '../inputTypeSchemas/ChatMessageActionUpdateInputSchema'
import { ChatMessageActionUncheckedUpdateInputSchema } from '../inputTypeSchemas/ChatMessageActionUncheckedUpdateInputSchema'
import { ChatMessageActionWhereUniqueInputSchema } from '../inputTypeSchemas/ChatMessageActionWhereUniqueInputSchema'

export const ChatMessageActionUpdateArgsSchema: z.ZodType<Omit<Prisma.ChatMessageActionUpdateArgs, "select" | "include">> = z.object({
  data: z.union([ ChatMessageActionUpdateInputSchema,ChatMessageActionUncheckedUpdateInputSchema ]),
  where: ChatMessageActionWhereUniqueInputSchema,
}).strict()

export default ChatMessageActionUpdateArgsSchema;
