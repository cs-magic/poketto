import type { Prisma } from '@prisma/client';
import { z } from 'zod';

export const ConversationCreateManyAppInputSchema: z.ZodType<Prisma.ConversationCreateManyAppInput> = z.object({
  id: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  isActive: z.boolean().optional(),
  userId: z.string(),
  pinned: z.boolean().optional()
}).strict();

export default ConversationCreateManyAppInputSchema;
