import type { Prisma } from '@prisma/client';
import { z } from 'zod';

export const AppStateUncheckedCreateWithoutAppInputSchema: z.ZodType<Prisma.AppStateUncheckedCreateWithoutAppInput> = z.object({
  id: z.string().optional(),
  createdAt: z.date().optional().nullable(),
  updatedAt: z.date().optional().nullable(),
  views: z.number().optional(),
  stars: z.number().optional(),
  forks: z.number().optional(),
  tips: z.number().optional(),
  calls: z.number().optional(),
  shares: z.number().optional()
}).strict();

export default AppStateUncheckedCreateWithoutAppInputSchema;
