import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const ChatMessageCountOutputTypeSelectSchema: z.ZodType<Prisma.ChatMessageCountOutputTypeSelect> = z.object({
  userActionOnMessage: z.boolean().optional(),
}).strict();

export default ChatMessageCountOutputTypeSelectSchema;
