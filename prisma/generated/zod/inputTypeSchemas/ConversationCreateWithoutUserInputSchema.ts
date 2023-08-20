import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ChatMessageCreateNestedManyWithoutConversationInputSchema } from './ChatMessageCreateNestedManyWithoutConversationInputSchema';
import { AppCreateNestedOneWithoutUsingInputSchema } from './AppCreateNestedOneWithoutUsingInputSchema';

export const ConversationCreateWithoutUserInputSchema: z.ZodType<Prisma.ConversationCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  isActive: z.boolean().optional(),
  pinned: z.boolean().optional(),
  messages: z.lazy(() => ChatMessageCreateNestedManyWithoutConversationInputSchema).optional(),
  app: z.lazy(() => AppCreateNestedOneWithoutUsingInputSchema)
}).strict();

export default ConversationCreateWithoutUserInputSchema;
