import type { Prisma } from '@prisma/client';
import { z } from 'zod';

export const StarringAppCreateManyUserInputSchema: z.ZodType<Prisma.StarringAppCreateManyUserInput> = z.object({
  id: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  appId: z.string(),
  isActive: z.boolean().optional()
}).strict();

export default StarringAppCreateManyUserInputSchema;
