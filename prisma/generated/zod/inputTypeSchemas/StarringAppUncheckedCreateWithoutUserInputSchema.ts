import type { Prisma } from '@prisma/client';
import { z } from 'zod';

export const StarringAppUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.StarringAppUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  appId: z.string(),
  isActive: z.boolean().optional()
}).strict();

export default StarringAppUncheckedCreateWithoutUserInputSchema;
