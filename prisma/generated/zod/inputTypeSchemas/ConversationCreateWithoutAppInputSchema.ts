import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ChatMessageCreateNestedManyWithoutConversationInputSchema } from './ChatMessageCreateNestedManyWithoutConversationInputSchema';
import { UserCreateNestedOneWithoutConversationsInputSchema } from './UserCreateNestedOneWithoutConversationsInputSchema';

export const ConversationCreateWithoutAppInputSchema: z.ZodType<Prisma.ConversationCreateWithoutAppInput> = z.object({
  id: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  isActive: z.boolean().optional(),
  pinned: z.boolean().optional(),
  messages: z.lazy(() => ChatMessageCreateNestedManyWithoutConversationInputSchema).optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutConversationsInputSchema)
}).strict();

export default ConversationCreateWithoutAppInputSchema;
