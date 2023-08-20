import type { Prisma } from '@prisma/client';
import { z } from 'zod';

export const StarringAppUncheckedCreateInputSchema: z.ZodType<Prisma.StarringAppUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  appId: z.string(),
  isActive: z.boolean().optional(),
  userId: z.string()
}).strict();

export default StarringAppUncheckedCreateInputSchema;
