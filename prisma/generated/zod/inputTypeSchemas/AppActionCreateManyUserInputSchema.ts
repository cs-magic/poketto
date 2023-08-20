import type { Prisma } from '@prisma/client';
import { z } from 'zod';

export const AppActionCreateManyUserInputSchema: z.ZodType<Prisma.AppActionCreateManyUserInput> = z.object({
  id: z.string().optional(),
  createdAt: z.date().optional().nullable(),
  updatedAt: z.date().optional().nullable(),
  appId: z.string(),
  action: z.string()
}).strict();

export default AppActionCreateManyUserInputSchema;
