import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ChatMessageCreateManyInputSchema } from '../inputTypeSchemas/ChatMessageCreateManyInputSchema'

export const ChatMessageCreateManyArgsSchema: z.ZodType<Prisma.ChatMessageCreateManyArgs> = z.object({
  data: z.union([ ChatMessageCreateManyInputSchema,ChatMessageCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export default ChatMessageCreateManyArgsSchema;
