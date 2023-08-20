import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ChatMessageFindManyArgsSchema } from "../outputTypeSchemas/ChatMessageFindManyArgsSchema"
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema"
import { AppArgsSchema } from "../outputTypeSchemas/AppArgsSchema"
import { ConversationCountOutputTypeArgsSchema } from "../outputTypeSchemas/ConversationCountOutputTypeArgsSchema"

export const ConversationIncludeSchema: z.ZodType<Prisma.ConversationInclude> = z.object({
  messages: z.union([z.boolean(),z.lazy(() => ChatMessageFindManyArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  app: z.union([z.boolean(),z.lazy(() => AppArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ConversationCountOutputTypeArgsSchema)]).optional(),
}).strict()

export default ConversationIncludeSchema;
