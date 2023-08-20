import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema"
import { ChatMessageActionFindManyArgsSchema } from "../outputTypeSchemas/ChatMessageActionFindManyArgsSchema"
import { ConversationArgsSchema } from "../outputTypeSchemas/ConversationArgsSchema"
import { ChatMessageCountOutputTypeArgsSchema } from "../outputTypeSchemas/ChatMessageCountOutputTypeArgsSchema"

export const ChatMessageSelectSchema: z.ZodType<Prisma.ChatMessageSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  userId: z.boolean().optional(),
  role: z.boolean().optional(),
  content: z.boolean().optional(),
  format: z.boolean().optional(),
  conversationId: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  userActionOnMessage: z.union([z.boolean(),z.lazy(() => ChatMessageActionFindManyArgsSchema)]).optional(),
  conversation: z.union([z.boolean(),z.lazy(() => ConversationArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ChatMessageCountOutputTypeArgsSchema)]).optional(),
}).strict()

export default ChatMessageSelectSchema;
