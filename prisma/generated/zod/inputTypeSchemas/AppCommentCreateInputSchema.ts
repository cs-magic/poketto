import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserCreateNestedOneWithoutAppCommentsInputSchema } from './UserCreateNestedOneWithoutAppCommentsInputSchema';
import { AppCreateNestedOneWithoutCommentsInputSchema } from './AppCreateNestedOneWithoutCommentsInputSchema';

export const AppCommentCreateInputSchema: z.ZodType<Prisma.AppCommentCreateInput> = z.object({
  id: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  title: z.string().optional().nullable(),
  content: z.string(),
  rate: z.number().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutAppCommentsInputSchema),
  aApp: z.lazy(() => AppCreateNestedOneWithoutCommentsInputSchema)
}).strict();

export default AppCommentCreateInputSchema;
