import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserCreateNestedOneWithoutConversationsInputSchema } from './UserCreateNestedOneWithoutConversationsInputSchema';
import { AppCreateNestedOneWithoutUsingInputSchema } from './AppCreateNestedOneWithoutUsingInputSchema';

export const ConversationCreateWithoutMessagesInputSchema: z.ZodType<Prisma.ConversationCreateWithoutMessagesInput> = z.object({
  id: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  isActive: z.boolean().optional(),
  pinned: z.boolean().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutConversationsInputSchema),
  app: z.lazy(() => AppCreateNestedOneWithoutUsingInputSchema)
}).strict();

export default ConversationCreateWithoutMessagesInputSchema;
