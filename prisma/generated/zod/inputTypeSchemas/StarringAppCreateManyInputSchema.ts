import type { Prisma } from '@prisma/client';
import { z } from 'zod';

export const StarringAppCreateManyInputSchema: z.ZodType<Prisma.StarringAppCreateManyInput> = z.object({
  id: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  appId: z.string(),
  isActive: z.boolean().optional(),
  userId: z.string()
}).strict();

export default StarringAppCreateManyInputSchema;
