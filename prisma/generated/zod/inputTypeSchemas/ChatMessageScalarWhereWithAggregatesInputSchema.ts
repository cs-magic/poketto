import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StringWithAggregatesFilterSchema } from './StringWithAggregatesFilterSchema';
import { DateTimeWithAggregatesFilterSchema } from './DateTimeWithAggregatesFilterSchema';
import { StringNullableWithAggregatesFilterSchema } from './StringNullableWithAggregatesFilterSchema';
import { EnumPromptRoleTypeWithAggregatesFilterSchema } from './EnumPromptRoleTypeWithAggregatesFilterSchema';
import { PromptRoleTypeSchema } from './PromptRoleTypeSchema';
import { EnumChatMessageFormatTypeWithAggregatesFilterSchema } from './EnumChatMessageFormatTypeWithAggregatesFilterSchema';
import { ChatMessageFormatTypeSchema } from './ChatMessageFormatTypeSchema';

export const ChatMessageScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ChatMessageScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ChatMessageScalarWhereWithAggregatesInputSchema),z.lazy(() => ChatMessageScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ChatMessageScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ChatMessageScalarWhereWithAggregatesInputSchema),z.lazy(() => ChatMessageScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  role: z.union([ z.lazy(() => EnumPromptRoleTypeWithAggregatesFilterSchema),z.lazy(() => PromptRoleTypeSchema) ]).optional(),
  content: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  format: z.union([ z.lazy(() => EnumChatMessageFormatTypeWithAggregatesFilterSchema),z.lazy(() => ChatMessageFormatTypeSchema) ]).optional(),
  conversationId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export default ChatMessageScalarWhereWithAggregatesInputSchema;
