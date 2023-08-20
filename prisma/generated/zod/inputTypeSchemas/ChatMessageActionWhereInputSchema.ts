import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StringFilterSchema } from './StringFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { UserRelationFilterSchema } from './UserRelationFilterSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';
import { ChatMessageRelationFilterSchema } from './ChatMessageRelationFilterSchema';
import { ChatMessageWhereInputSchema } from './ChatMessageWhereInputSchema';

export const ChatMessageActionWhereInputSchema: z.ZodType<Prisma.ChatMessageActionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ChatMessageActionWhereInputSchema),z.lazy(() => ChatMessageActionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ChatMessageActionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ChatMessageActionWhereInputSchema),z.lazy(() => ChatMessageActionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  messageId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  action: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  message: z.union([ z.lazy(() => ChatMessageRelationFilterSchema),z.lazy(() => ChatMessageWhereInputSchema) ]).optional(),
}).strict();

export default ChatMessageActionWhereInputSchema;
