import type { Prisma } from '@prisma/client';
import { z } from 'zod';

export const AppActionCreateManyInputSchema: z.ZodType<Prisma.AppActionCreateManyInput> = z.object({
  id: z.string().optional(),
  createdAt: z.date().optional().nullable(),
  updatedAt: z.date().optional().nullable(),
  userId: z.string().optional().nullable(),
  appId: z.string(),
  action: z.string()
}).strict();

export default AppActionCreateManyInputSchema;
