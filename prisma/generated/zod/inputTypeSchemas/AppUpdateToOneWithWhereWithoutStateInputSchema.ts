import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppWhereInputSchema } from './AppWhereInputSchema';
import { AppUpdateWithoutStateInputSchema } from './AppUpdateWithoutStateInputSchema';
import { AppUncheckedUpdateWithoutStateInputSchema } from './AppUncheckedUpdateWithoutStateInputSchema';

export const AppUpdateToOneWithWhereWithoutStateInputSchema: z.ZodType<Prisma.AppUpdateToOneWithWhereWithoutStateInput> = z.object({
  where: z.lazy(() => AppWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => AppUpdateWithoutStateInputSchema),z.lazy(() => AppUncheckedUpdateWithoutStateInputSchema) ]),
}).strict();

export default AppUpdateToOneWithWhereWithoutStateInputSchema;
