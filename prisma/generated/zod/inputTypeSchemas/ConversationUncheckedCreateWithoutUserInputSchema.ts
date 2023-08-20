import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ChatMessageUncheckedCreateNestedManyWithoutConversationInputSchema } from './ChatMessageUncheckedCreateNestedManyWithoutConversationInputSchema';

export const ConversationUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.ConversationUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  isActive: z.boolean().optional(),
  appId: z.string(),
  pinned: z.boolean().optional(),
  messages: z.lazy(() => ChatMessageUncheckedCreateNestedManyWithoutConversationInputSchema).optional()
}).strict();

export default ConversationUncheckedCreateWithoutUserInputSchema;
