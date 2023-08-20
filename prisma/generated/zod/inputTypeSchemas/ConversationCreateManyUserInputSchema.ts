import type { Prisma } from '@prisma/client';
import { z } from 'zod';

export const ConversationCreateManyUserInputSchema: z.ZodType<Prisma.ConversationCreateManyUserInput> = z.object({
  id: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  isActive: z.boolean().optional(),
  appId: z.string(),
  pinned: z.boolean().optional()
}).strict();

export default ConversationCreateManyUserInputSchema;
