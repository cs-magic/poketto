import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ChatMessageActionWhereInputSchema } from './ChatMessageActionWhereInputSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { UserRelationFilterSchema } from './UserRelationFilterSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';
import { ChatMessageRelationFilterSchema } from './ChatMessageRelationFilterSchema';
import { ChatMessageWhereInputSchema } from './ChatMessageWhereInputSchema';

export const ChatMessageActionWhereUniqueInputSchema: z.ZodType<Prisma.ChatMessageActionWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => ChatMessageActionWhereInputSchema),z.lazy(() => ChatMessageActionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ChatMessageActionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ChatMessageActionWhereInputSchema),z.lazy(() => ChatMessageActionWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  messageId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  action: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  message: z.union([ z.lazy(() => ChatMessageRelationFilterSchema),z.lazy(() => ChatMessageWhereInputSchema) ]).optional(),
}).strict());

export default ChatMessageActionWhereUniqueInputSchema;
