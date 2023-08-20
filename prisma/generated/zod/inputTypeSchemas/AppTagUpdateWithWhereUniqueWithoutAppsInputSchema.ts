import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppTagWhereUniqueInputSchema } from './AppTagWhereUniqueInputSchema';
import { AppTagUpdateWithoutAppsInputSchema } from './AppTagUpdateWithoutAppsInputSchema';
import { AppTagUncheckedUpdateWithoutAppsInputSchema } from './AppTagUncheckedUpdateWithoutAppsInputSchema';

export const AppTagUpdateWithWhereUniqueWithoutAppsInputSchema: z.ZodType<Prisma.AppTagUpdateWithWhereUniqueWithoutAppsInput> = z.object({
  where: z.lazy(() => AppTagWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AppTagUpdateWithoutAppsInputSchema),z.lazy(() => AppTagUncheckedUpdateWithoutAppsInputSchema) ]),
}).strict();

export default AppTagUpdateWithWhereUniqueWithoutAppsInputSchema;
