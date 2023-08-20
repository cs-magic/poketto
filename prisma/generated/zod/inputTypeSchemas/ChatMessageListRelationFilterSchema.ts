import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ChatMessageWhereInputSchema } from './ChatMessageWhereInputSchema';

export const ChatMessageListRelationFilterSchema: z.ZodType<Prisma.ChatMessageListRelationFilter> = z.object({
  every: z.lazy(() => ChatMessageWhereInputSchema).optional(),
  some: z.lazy(() => ChatMessageWhereInputSchema).optional(),
  none: z.lazy(() => ChatMessageWhereInputSchema).optional()
}).strict();

export default ChatMessageListRelationFilterSchema;
