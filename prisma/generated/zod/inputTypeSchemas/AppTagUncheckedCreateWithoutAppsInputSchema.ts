import type { Prisma } from '@prisma/client';
import { z } from 'zod';

export const AppTagUncheckedCreateWithoutAppsInputSchema: z.ZodType<Prisma.AppTagUncheckedCreateWithoutAppsInput> = z.object({
  id: z.string().optional(),
  createdAt: z.date().optional().nullable(),
  updatedAt: z.date().optional().nullable(),
  creatorId: z.string().optional().nullable(),
  name: z.string()
}).strict();

export default AppTagUncheckedCreateWithoutAppsInputSchema;
