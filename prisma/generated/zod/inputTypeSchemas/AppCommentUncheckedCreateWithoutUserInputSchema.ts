import type { Prisma } from '@prisma/client';
import { z } from 'zod';

export const AppCommentUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.AppCommentUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  appId: z.string(),
  title: z.string().optional().nullable(),
  content: z.string(),
  rate: z.number().optional().nullable()
}).strict();

export default AppCommentUncheckedCreateWithoutUserInputSchema;
