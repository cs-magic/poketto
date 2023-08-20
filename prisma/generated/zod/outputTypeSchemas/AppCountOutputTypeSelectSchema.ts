import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const AppCountOutputTypeSelectSchema: z.ZodType<Prisma.AppCountOutputTypeSelect> = z.object({
  tags: z.boolean().optional(),
  actions: z.boolean().optional(),
  using: z.boolean().optional(),
  starring: z.boolean().optional(),
  comments: z.boolean().optional(),
}).strict();

export default AppCountOutputTypeSelectSchema;
