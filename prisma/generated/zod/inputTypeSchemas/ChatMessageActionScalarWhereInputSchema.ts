import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StringFilterSchema } from './StringFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';

export const ChatMessageActionScalarWhereInputSchema: z.ZodType<Prisma.ChatMessageActionScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ChatMessageActionScalarWhereInputSchema),z.lazy(() => ChatMessageActionScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ChatMessageActionScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ChatMessageActionScalarWhereInputSchema),z.lazy(() => ChatMessageActionScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  messageId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  action: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export default ChatMessageActionScalarWhereInputSchema;
