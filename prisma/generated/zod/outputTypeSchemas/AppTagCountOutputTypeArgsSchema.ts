import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AppTagCountOutputTypeSelectSchema } from './AppTagCountOutputTypeSelectSchema';

export const AppTagCountOutputTypeArgsSchema: z.ZodType<Prisma.AppTagCountOutputTypeArgs> = z.object({
  select: z.lazy(() => AppTagCountOutputTypeSelectSchema).nullish(),
}).strict();

export default AppTagCountOutputTypeSelectSchema;
