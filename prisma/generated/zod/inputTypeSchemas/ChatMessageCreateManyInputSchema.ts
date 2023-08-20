import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { PromptRoleTypeSchema } from './PromptRoleTypeSchema';
import { ChatMessageFormatTypeSchema } from './ChatMessageFormatTypeSchema';

export const ChatMessageCreateManyInputSchema: z.ZodType<Prisma.ChatMessageCreateManyInput> = z.object({
  id: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  userId: z.string().optional().nullable(),
  role: z.lazy(() => PromptRoleTypeSchema).optional(),
  content: z.string(),
  format: z.lazy(() => ChatMessageFormatTypeSchema).optional(),
  conversationId: z.string()
}).strict();

export default ChatMessageCreateManyInputSchema;
