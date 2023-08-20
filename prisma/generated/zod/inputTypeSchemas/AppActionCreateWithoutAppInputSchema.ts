import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserCreateNestedOneWithoutAppActionsInputSchema } from './UserCreateNestedOneWithoutAppActionsInputSchema';

export const AppActionCreateWithoutAppInputSchema: z.ZodType<Prisma.AppActionCreateWithoutAppInput> = z.object({
  id: z.string().optional(),
  createdAt: z.date().optional().nullable(),
  updatedAt: z.date().optional().nullable(),
  action: z.string(),
  user: z.lazy(() => UserCreateNestedOneWithoutAppActionsInputSchema).optional()
}).strict();

export default AppActionCreateWithoutAppInputSchema;
