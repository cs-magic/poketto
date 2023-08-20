import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ChatMessageCountOutputTypeSelectSchema } from './ChatMessageCountOutputTypeSelectSchema';

export const ChatMessageCountOutputTypeArgsSchema: z.ZodType<Prisma.ChatMessageCountOutputTypeArgs> = z.object({
  select: z.lazy(() => ChatMessageCountOutputTypeSelectSchema).nullish(),
}).strict();

export default ChatMessageCountOutputTypeSelectSchema;
