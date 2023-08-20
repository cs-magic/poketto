import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserCreateNestedOneWithoutAppActionsInputSchema } from './UserCreateNestedOneWithoutAppActionsInputSchema';
import { AppCreateNestedOneWithoutActionsInputSchema } from './AppCreateNestedOneWithoutActionsInputSchema';

export const AppActionCreateInputSchema: z.ZodType<Prisma.AppActionCreateInput> = z.object({
  id: z.string().optional(),
  createdAt: z.date().optional().nullable(),
  updatedAt: z.date().optional().nullable(),
  action: z.string(),
  user: z.lazy(() => UserCreateNestedOneWithoutAppActionsInputSchema).optional(),
  app: z.lazy(() => AppCreateNestedOneWithoutActionsInputSchema)
}).strict();

export default AppActionCreateInputSchema;
