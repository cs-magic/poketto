import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ChatMessageActionCreateManyInputSchema } from '../inputTypeSchemas/ChatMessageActionCreateManyInputSchema'

export const ChatMessageActionCreateManyArgsSchema: z.ZodType<Prisma.ChatMessageActionCreateManyArgs> = z.object({
  data: z.union([ ChatMessageActionCreateManyInputSchema,ChatMessageActionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export default ChatMessageActionCreateManyArgsSchema;
