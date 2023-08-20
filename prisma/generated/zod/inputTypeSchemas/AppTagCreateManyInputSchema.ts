import type { Prisma } from '@prisma/client';
import { z } from 'zod';

export const AppTagCreateManyInputSchema: z.ZodType<Prisma.AppTagCreateManyInput> = z.object({
  id: z.string().optional(),
  createdAt: z.date().optional().nullable(),
  updatedAt: z.date().optional().nullable(),
  creatorId: z.string().optional().nullable(),
  name: z.string()
}).strict();

export default AppTagCreateManyInputSchema;
