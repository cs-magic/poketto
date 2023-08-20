import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ChatMessageUpdateManyMutationInputSchema } from '../inputTypeSchemas/ChatMessageUpdateManyMutationInputSchema'
import { ChatMessageUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/ChatMessageUncheckedUpdateManyInputSchema'
import { ChatMessageWhereInputSchema } from '../inputTypeSchemas/ChatMessageWhereInputSchema'

export const ChatMessageUpdateManyArgsSchema: z.ZodType<Prisma.ChatMessageUpdateManyArgs> = z.object({
  data: z.union([ ChatMessageUpdateManyMutationInputSchema,ChatMessageUncheckedUpdateManyInputSchema ]),
  where: ChatMessageWhereInputSchema.optional(),
}).strict()

export default ChatMessageUpdateManyArgsSchema;
