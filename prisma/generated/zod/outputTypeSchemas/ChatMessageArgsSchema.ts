import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ChatMessageSelectSchema } from '../inputTypeSchemas/ChatMessageSelectSchema';
import { ChatMessageIncludeSchema } from '../inputTypeSchemas/ChatMessageIncludeSchema';

export const ChatMessageArgsSchema: z.ZodType<Prisma.ChatMessageArgs> = z.object({
  select: z.lazy(() => ChatMessageSelectSchema).optional(),
  include: z.lazy(() => ChatMessageIncludeSchema).optional(),
}).strict();

export default ChatMessageArgsSchema;
