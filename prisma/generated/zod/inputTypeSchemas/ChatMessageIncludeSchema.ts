import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema"
import { ChatMessageActionFindManyArgsSchema } from "../outputTypeSchemas/ChatMessageActionFindManyArgsSchema"
import { ConversationArgsSchema } from "../outputTypeSchemas/ConversationArgsSchema"
import { ChatMessageCountOutputTypeArgsSchema } from "../outputTypeSchemas/ChatMessageCountOutputTypeArgsSchema"

export const ChatMessageIncludeSchema: z.ZodType<Prisma.ChatMessageInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  userActionOnMessage: z.union([z.boolean(),z.lazy(() => ChatMessageActionFindManyArgsSchema)]).optional(),
  conversation: z.union([z.boolean(),z.lazy(() => ConversationArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ChatMessageCountOutputTypeArgsSchema)]).optional(),
}).strict()

export default ChatMessageIncludeSchema;
