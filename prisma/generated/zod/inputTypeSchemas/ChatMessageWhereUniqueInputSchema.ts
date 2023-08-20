import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ChatMessageWhereInputSchema } from './ChatMessageWhereInputSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { EnumPromptRoleTypeFilterSchema } from './EnumPromptRoleTypeFilterSchema';
import { PromptRoleTypeSchema } from './PromptRoleTypeSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { EnumChatMessageFormatTypeFilterSchema } from './EnumChatMessageFormatTypeFilterSchema';
import { ChatMessageFormatTypeSchema } from './ChatMessageFormatTypeSchema';
import { UserNullableRelationFilterSchema } from './UserNullableRelationFilterSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';
import { ChatMessageActionListRelationFilterSchema } from './ChatMessageActionListRelationFilterSchema';
import { ConversationRelationFilterSchema } from './ConversationRelationFilterSchema';
import { ConversationWhereInputSchema } from './ConversationWhereInputSchema';

export const ChatMessageWhereUniqueInputSchema: z.ZodType<Prisma.ChatMessageWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => ChatMessageWhereInputSchema),z.lazy(() => ChatMessageWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ChatMessageWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ChatMessageWhereInputSchema),z.lazy(() => ChatMessageWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  role: z.union([ z.lazy(() => EnumPromptRoleTypeFilterSchema),z.lazy(() => PromptRoleTypeSchema) ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  format: z.union([ z.lazy(() => EnumChatMessageFormatTypeFilterSchema),z.lazy(() => ChatMessageFormatTypeSchema) ]).optional(),
  conversationId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserNullableRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
  userActionOnMessage: z.lazy(() => ChatMessageActionListRelationFilterSchema).optional(),
  conversation: z.union([ z.lazy(() => ConversationRelationFilterSchema),z.lazy(() => ConversationWhereInputSchema) ]).optional(),
}).strict());

export default ChatMessageWhereUniqueInputSchema;
