import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppUpdateWithoutStarringInputSchema } from './AppUpdateWithoutStarringInputSchema';
import { AppUncheckedUpdateWithoutStarringInputSchema } from './AppUncheckedUpdateWithoutStarringInputSchema';
import { AppCreateWithoutStarringInputSchema } from './AppCreateWithoutStarringInputSchema';
import { AppUncheckedCreateWithoutStarringInputSchema } from './AppUncheckedCreateWithoutStarringInputSchema';
import { AppWhereInputSchema } from './AppWhereInputSchema';

export const AppUpsertWithoutStarringInputSchema: z.ZodType<Prisma.AppUpsertWithoutStarringInput> = z.object({
  update: z.union([ z.lazy(() => AppUpdateWithoutStarringInputSchema),z.lazy(() => AppUncheckedUpdateWithoutStarringInputSchema) ]),
  create: z.union([ z.lazy(() => AppCreateWithoutStarringInputSchema),z.lazy(() => AppUncheckedCreateWithoutStarringInputSchema) ]),
  where: z.lazy(() => AppWhereInputSchema).optional()
}).strict();

export default AppUpsertWithoutStarringInputSchema;
