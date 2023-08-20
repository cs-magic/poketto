import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema"
import { ChatMessageArgsSchema } from "../outputTypeSchemas/ChatMessageArgsSchema"

export const ChatMessageActionIncludeSchema: z.ZodType<Prisma.ChatMessageActionInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  message: z.union([z.boolean(),z.lazy(() => ChatMessageArgsSchema)]).optional(),
}).strict()

export default ChatMessageActionIncludeSchema;
