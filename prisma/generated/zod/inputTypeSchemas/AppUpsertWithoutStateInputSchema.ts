import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppUpdateWithoutStateInputSchema } from './AppUpdateWithoutStateInputSchema';
import { AppUncheckedUpdateWithoutStateInputSchema } from './AppUncheckedUpdateWithoutStateInputSchema';
import { AppCreateWithoutStateInputSchema } from './AppCreateWithoutStateInputSchema';
import { AppUncheckedCreateWithoutStateInputSchema } from './AppUncheckedCreateWithoutStateInputSchema';
import { AppWhereInputSchema } from './AppWhereInputSchema';

export const AppUpsertWithoutStateInputSchema: z.ZodType<Prisma.AppUpsertWithoutStateInput> = z.object({
  update: z.union([ z.lazy(() => AppUpdateWithoutStateInputSchema),z.lazy(() => AppUncheckedUpdateWithoutStateInputSchema) ]),
  create: z.union([ z.lazy(() => AppCreateWithoutStateInputSchema),z.lazy(() => AppUncheckedCreateWithoutStateInputSchema) ]),
  where: z.lazy(() => AppWhereInputSchema).optional()
}).strict();

export default AppUpsertWithoutStateInputSchema;
