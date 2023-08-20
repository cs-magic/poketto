import type { Prisma } from '@prisma/client';
import { z } from 'zod';

export const ConversationCreateManyInputSchema: z.ZodType<Prisma.ConversationCreateManyInput> = z.object({
  id: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  isActive: z.boolean().optional(),
  userId: z.string(),
  appId: z.string(),
  pinned: z.boolean().optional()
}).strict();

export default ConversationCreateManyInputSchema;
