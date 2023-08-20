import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ConversationConversationCompoundUniqueInputSchema } from './ConversationConversationCompoundUniqueInputSchema';
import { ConversationWhereInputSchema } from './ConversationWhereInputSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { BoolFilterSchema } from './BoolFilterSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { ChatMessageListRelationFilterSchema } from './ChatMessageListRelationFilterSchema';
import { UserRelationFilterSchema } from './UserRelationFilterSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';
import { AppRelationFilterSchema } from './AppRelationFilterSchema';
import { AppWhereInputSchema } from './AppWhereInputSchema';

export const ConversationWhereUniqueInputSchema: z.ZodType<Prisma.ConversationWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    conversation: z.lazy(() => ConversationConversationCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    conversation: z.lazy(() => ConversationConversationCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.string().optional(),
  conversation: z.lazy(() => ConversationConversationCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => ConversationWhereInputSchema),z.lazy(() => ConversationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ConversationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ConversationWhereInputSchema),z.lazy(() => ConversationWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.date() ]).optional(),
  isActive: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  appId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  pinned: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  messages: z.lazy(() => ChatMessageListRelationFilterSchema).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  app: z.union([ z.lazy(() => AppRelationFilterSchema),z.lazy(() => AppWhereInputSchema) ]).optional(),
}).strict());

export default ConversationWhereUniqueInputSchema;
