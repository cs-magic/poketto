import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { UserOrderByWithRelationInputSchema } from './UserOrderByWithRelationInputSchema';
import { ChatMessageOrderByWithRelationInputSchema } from './ChatMessageOrderByWithRelationInputSchema';

export const ChatMessageActionOrderByWithRelationInputSchema: z.ZodType<Prisma.ChatMessageActionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  messageId: z.lazy(() => SortOrderSchema).optional(),
  action: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  message: z.lazy(() => ChatMessageOrderByWithRelationInputSchema).optional()
}).strict();

export default ChatMessageActionOrderByWithRelationInputSchema;
