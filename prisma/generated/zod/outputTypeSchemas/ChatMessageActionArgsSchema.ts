import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ChatMessageActionSelectSchema } from '../inputTypeSchemas/ChatMessageActionSelectSchema';
import { ChatMessageActionIncludeSchema } from '../inputTypeSchemas/ChatMessageActionIncludeSchema';

export const ChatMessageActionArgsSchema: z.ZodType<Prisma.ChatMessageActionArgs> = z.object({
  select: z.lazy(() => ChatMessageActionSelectSchema).optional(),
  include: z.lazy(() => ChatMessageActionIncludeSchema).optional(),
}).strict();

export default ChatMessageActionArgsSchema;
