import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ChatMessageCreateNestedManyWithoutConversationInputSchema } from './ChatMessageCreateNestedManyWithoutConversationInputSchema';
import { UserCreateNestedOneWithoutConversationsInputSchema } from './UserCreateNestedOneWithoutConversationsInputSchema';
import { AppCreateNestedOneWithoutUsingInputSchema } from './AppCreateNestedOneWithoutUsingInputSchema';

export const ConversationCreateInputSchema: z.ZodType<Prisma.ConversationCreateInput> = z.object({
  id: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  isActive: z.boolean().optional(),
  pinned: z.boolean().optional(),
  messages: z.lazy(() => ChatMessageCreateNestedManyWithoutConversationInputSchema).optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutConversationsInputSchema),
  app: z.lazy(() => AppCreateNestedOneWithoutUsingInputSchema)
}).strict();

export default ConversationCreateInputSchema;
