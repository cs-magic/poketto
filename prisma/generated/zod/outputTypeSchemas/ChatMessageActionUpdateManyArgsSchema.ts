import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ChatMessageActionUpdateManyMutationInputSchema } from '../inputTypeSchemas/ChatMessageActionUpdateManyMutationInputSchema'
import { ChatMessageActionUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/ChatMessageActionUncheckedUpdateManyInputSchema'
import { ChatMessageActionWhereInputSchema } from '../inputTypeSchemas/ChatMessageActionWhereInputSchema'

export const ChatMessageActionUpdateManyArgsSchema: z.ZodType<Prisma.ChatMessageActionUpdateManyArgs> = z.object({
  data: z.union([ ChatMessageActionUpdateManyMutationInputSchema,ChatMessageActionUncheckedUpdateManyInputSchema ]),
  where: ChatMessageActionWhereInputSchema.optional(),
}).strict()

export default ChatMessageActionUpdateManyArgsSchema;
