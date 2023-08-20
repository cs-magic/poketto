import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppWhereUniqueInputSchema } from './AppWhereUniqueInputSchema';
import { AppUpdateWithoutCreatorInputSchema } from './AppUpdateWithoutCreatorInputSchema';
import { AppUncheckedUpdateWithoutCreatorInputSchema } from './AppUncheckedUpdateWithoutCreatorInputSchema';

export const AppUpdateWithWhereUniqueWithoutCreatorInputSchema: z.ZodType<Prisma.AppUpdateWithWhereUniqueWithoutCreatorInput> = z.object({
  where: z.lazy(() => AppWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AppUpdateWithoutCreatorInputSchema),z.lazy(() => AppUncheckedUpdateWithoutCreatorInputSchema) ]),
}).strict();

export default AppUpdateWithWhereUniqueWithoutCreatorInputSchema;
