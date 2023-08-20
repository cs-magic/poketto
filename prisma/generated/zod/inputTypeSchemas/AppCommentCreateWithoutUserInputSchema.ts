import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppCreateNestedOneWithoutCommentsInputSchema } from './AppCreateNestedOneWithoutCommentsInputSchema';

export const AppCommentCreateWithoutUserInputSchema: z.ZodType<Prisma.AppCommentCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  title: z.string().optional().nullable(),
  content: z.string(),
  rate: z.number().optional().nullable(),
  aApp: z.lazy(() => AppCreateNestedOneWithoutCommentsInputSchema)
}).strict();

export default AppCommentCreateWithoutUserInputSchema;
