import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AppTagSelectSchema } from '../inputTypeSchemas/AppTagSelectSchema';
import { AppTagIncludeSchema } from '../inputTypeSchemas/AppTagIncludeSchema';

export const AppTagArgsSchema: z.ZodType<Prisma.AppTagArgs> = z.object({
  select: z.lazy(() => AppTagSelectSchema).optional(),
  include: z.lazy(() => AppTagIncludeSchema).optional(),
}).strict();

export default AppTagArgsSchema;
