import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ChatMessageWhereInputSchema } from './ChatMessageWhereInputSchema';

export const ChatMessageRelationFilterSchema: z.ZodType<Prisma.ChatMessageRelationFilter> = z.object({
  is: z.lazy(() => ChatMessageWhereInputSchema).optional(),
  isNot: z.lazy(() => ChatMessageWhereInputSchema).optional()
}).strict();

export default ChatMessageRelationFilterSchema;
