import type { Prisma } from '@prisma/client';
import { z } from 'zod';

export const AppTagCreateManyCreatorInputSchema: z.ZodType<Prisma.AppTagCreateManyCreatorInput> = z.object({
  id: z.string().optional(),
  createdAt: z.date().optional().nullable(),
  updatedAt: z.date().optional().nullable(),
  name: z.string()
}).strict();

export default AppTagCreateManyCreatorInputSchema;
