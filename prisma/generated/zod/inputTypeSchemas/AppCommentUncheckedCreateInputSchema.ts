import type { Prisma } from '@prisma/client';
import { z } from 'zod';

export const AppCommentUncheckedCreateInputSchema: z.ZodType<Prisma.AppCommentUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  userId: z.string(),
  appId: z.string(),
  title: z.string().optional().nullable(),
  content: z.string(),
  rate: z.number().optional().nullable()
}).strict();

export default AppCommentUncheckedCreateInputSchema;
