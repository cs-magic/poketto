import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ChatMessageActionWhereUniqueInputSchema } from '../inputTypeSchemas/ChatMessageActionWhereUniqueInputSchema'
import { ChatMessageActionCreateInputSchema } from '../inputTypeSchemas/ChatMessageActionCreateInputSchema'
import { ChatMessageActionUncheckedCreateInputSchema } from '../inputTypeSchemas/ChatMessageActionUncheckedCreateInputSchema'
import { ChatMessageActionUpdateInputSchema } from '../inputTypeSchemas/ChatMessageActionUpdateInputSchema'
import { ChatMessageActionUncheckedUpdateInputSchema } from '../inputTypeSchemas/ChatMessageActionUncheckedUpdateInputSchema'

export const ChatMessageActionUpsertArgsSchema: z.ZodType<Omit<Prisma.ChatMessageActionUpsertArgs, "select" | "include">> = z.object({
  where: ChatMessageActionWhereUniqueInputSchema,
  create: z.union([ ChatMessageActionCreateInputSchema,ChatMessageActionUncheckedCreateInputSchema ]),
  update: z.union([ ChatMessageActionUpdateInputSchema,ChatMessageActionUncheckedUpdateInputSchema ]),
}).strict()

export default ChatMessageActionUpsertArgsSchema;
