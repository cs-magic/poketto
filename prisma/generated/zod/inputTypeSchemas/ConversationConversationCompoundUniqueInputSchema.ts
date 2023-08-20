import type { Prisma } from '@prisma/client';
import { z } from 'zod';

export const ConversationConversationCompoundUniqueInputSchema: z.ZodType<Prisma.ConversationConversationCompoundUniqueInput> = z.object({
  userId: z.string(),
  appId: z.string()
}).strict();

export default ConversationConversationCompoundUniqueInputSchema;
