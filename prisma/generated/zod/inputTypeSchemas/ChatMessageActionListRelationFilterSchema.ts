import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ChatMessageActionWhereInputSchema } from './ChatMessageActionWhereInputSchema';

export const ChatMessageActionListRelationFilterSchema: z.ZodType<Prisma.ChatMessageActionListRelationFilter> = z.object({
  every: z.lazy(() => ChatMessageActionWhereInputSchema).optional(),
  some: z.lazy(() => ChatMessageActionWhereInputSchema).optional(),
  none: z.lazy(() => ChatMessageActionWhereInputSchema).optional()
}).strict();

export default ChatMessageActionListRelationFilterSchema;
