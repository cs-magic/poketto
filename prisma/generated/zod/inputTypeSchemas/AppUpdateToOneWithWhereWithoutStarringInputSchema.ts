import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppWhereInputSchema } from './AppWhereInputSchema';
import { AppUpdateWithoutStarringInputSchema } from './AppUpdateWithoutStarringInputSchema';
import { AppUncheckedUpdateWithoutStarringInputSchema } from './AppUncheckedUpdateWithoutStarringInputSchema';

export const AppUpdateToOneWithWhereWithoutStarringInputSchema: z.ZodType<Prisma.AppUpdateToOneWithWhereWithoutStarringInput> = z.object({
  where: z.lazy(() => AppWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => AppUpdateWithoutStarringInputSchema),z.lazy(() => AppUncheckedUpdateWithoutStarringInputSchema) ]),
}).strict();

export default AppUpdateToOneWithWhereWithoutStarringInputSchema;
