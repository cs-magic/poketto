import type { Prisma } from '@prisma/client';
import { z } from 'zod';

export const StarringAppUncheckedCreateWithoutAppInputSchema: z.ZodType<Prisma.StarringAppUncheckedCreateWithoutAppInput> = z.object({
  id: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  isActive: z.boolean().optional(),
  userId: z.string()
}).strict();

export default StarringAppUncheckedCreateWithoutAppInputSchema;
