import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserCreateNestedOneWithoutAppCommentsInputSchema } from './UserCreateNestedOneWithoutAppCommentsInputSchema';

export const AppCommentCreateWithoutAAppInputSchema: z.ZodType<Prisma.AppCommentCreateWithoutAAppInput> = z.object({
  id: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  title: z.string().optional().nullable(),
  content: z.string(),
  rate: z.number().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutAppCommentsInputSchema)
}).strict();

export default AppCommentCreateWithoutAAppInputSchema;
