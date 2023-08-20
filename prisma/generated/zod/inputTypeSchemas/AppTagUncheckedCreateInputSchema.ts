import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppUncheckedCreateNestedManyWithoutTagsInputSchema } from './AppUncheckedCreateNestedManyWithoutTagsInputSchema';

export const AppTagUncheckedCreateInputSchema: z.ZodType<Prisma.AppTagUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  createdAt: z.date().optional().nullable(),
  updatedAt: z.date().optional().nullable(),
  creatorId: z.string().optional().nullable(),
  name: z.string(),
  apps: z.lazy(() => AppUncheckedCreateNestedManyWithoutTagsInputSchema).optional()
}).strict();

export default AppTagUncheckedCreateInputSchema;
