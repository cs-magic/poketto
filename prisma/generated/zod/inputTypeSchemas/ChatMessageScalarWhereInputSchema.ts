import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StringFilterSchema } from './StringFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { EnumPromptRoleTypeFilterSchema } from './EnumPromptRoleTypeFilterSchema';
import { PromptRoleTypeSchema } from './PromptRoleTypeSchema';
import { EnumChatMessageFormatTypeFilterSchema } from './EnumChatMessageFormatTypeFilterSchema';
import { ChatMessageFormatTypeSchema } from './ChatMessageFormatTypeSchema';

export const ChatMessageScalarWhereInputSchema: z.ZodType<Prisma.ChatMessageScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ChatMessageScalarWhereInputSchema),z.lazy(() => ChatMessageScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ChatMessageScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ChatMessageScalarWhereInputSchema),z.lazy(() => ChatMessageScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  role: z.union([ z.lazy(() => EnumPromptRoleTypeFilterSchema),z.lazy(() => PromptRoleTypeSchema) ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  format: z.union([ z.lazy(() => EnumChatMessageFormatTypeFilterSchema),z.lazy(() => ChatMessageFormatTypeSchema) ]).optional(),
  conversationId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export default ChatMessageScalarWhereInputSchema;
