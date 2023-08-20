import type { Prisma } from '@prisma/client';
import { z } from 'zod';

export const AppActionCreateManyAppInputSchema: z.ZodType<Prisma.AppActionCreateManyAppInput> = z.object({
  id: z.string().optional(),
  createdAt: z.date().optional().nullable(),
  updatedAt: z.date().optional().nullable(),
  userId: z.string().optional().nullable(),
  action: z.string()
}).strict();

export default AppActionCreateManyAppInputSchema;
