import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppCreateNestedOneWithoutActionsInputSchema } from './AppCreateNestedOneWithoutActionsInputSchema';

export const AppActionCreateWithoutUserInputSchema: z.ZodType<Prisma.AppActionCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  createdAt: z.date().optional().nullable(),
  updatedAt: z.date().optional().nullable(),
  action: z.string(),
  app: z.lazy(() => AppCreateNestedOneWithoutActionsInputSchema)
}).strict();

export default AppActionCreateWithoutUserInputSchema;
