import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AppSelectSchema } from '../inputTypeSchemas/AppSelectSchema';
import { AppIncludeSchema } from '../inputTypeSchemas/AppIncludeSchema';

export const AppArgsSchema: z.ZodType<Prisma.AppArgs> = z.object({
  select: z.lazy(() => AppSelectSchema).optional(),
  include: z.lazy(() => AppIncludeSchema).optional(),
}).strict();

export default AppArgsSchema;
