import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserCreateNestedOneWithoutTagsInputSchema } from './UserCreateNestedOneWithoutTagsInputSchema';
import { AppCreateNestedManyWithoutTagsInputSchema } from './AppCreateNestedManyWithoutTagsInputSchema';

export const AppTagCreateInputSchema: z.ZodType<Prisma.AppTagCreateInput> = z.object({
  id: z.string().optional(),
  createdAt: z.date().optional().nullable(),
  updatedAt: z.date().optional().nullable(),
  name: z.string(),
  creator: z.lazy(() => UserCreateNestedOneWithoutTagsInputSchema).optional(),
  apps: z.lazy(() => AppCreateNestedManyWithoutTagsInputSchema).optional()
}).strict();

export default AppTagCreateInputSchema;
