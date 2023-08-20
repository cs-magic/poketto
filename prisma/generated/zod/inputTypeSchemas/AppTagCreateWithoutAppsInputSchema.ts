import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserCreateNestedOneWithoutTagsInputSchema } from './UserCreateNestedOneWithoutTagsInputSchema';

export const AppTagCreateWithoutAppsInputSchema: z.ZodType<Prisma.AppTagCreateWithoutAppsInput> = z.object({
  id: z.string().optional(),
  createdAt: z.date().optional().nullable(),
  updatedAt: z.date().optional().nullable(),
  name: z.string(),
  creator: z.lazy(() => UserCreateNestedOneWithoutTagsInputSchema).optional()
}).strict();

export default AppTagCreateWithoutAppsInputSchema;
