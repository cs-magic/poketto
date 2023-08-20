import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema"
import { ChatMessageArgsSchema } from "../outputTypeSchemas/ChatMessageArgsSchema"

export const ChatMessageActionSelectSchema: z.ZodType<Prisma.ChatMessageActionSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  userId: z.boolean().optional(),
  messageId: z.boolean().optional(),
  action: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  message: z.union([z.boolean(),z.lazy(() => ChatMessageArgsSchema)]).optional(),
}).strict()

export default ChatMessageActionSelectSchema;
