import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppTagWhereUniqueInputSchema } from './AppTagWhereUniqueInputSchema';
import { AppTagUpdateWithoutAppsInputSchema } from './AppTagUpdateWithoutAppsInputSchema';
import { AppTagUncheckedUpdateWithoutAppsInputSchema } from './AppTagUncheckedUpdateWithoutAppsInputSchema';
import { AppTagCreateWithoutAppsInputSchema } from './AppTagCreateWithoutAppsInputSchema';
import { AppTagUncheckedCreateWithoutAppsInputSchema } from './AppTagUncheckedCreateWithoutAppsInputSchema';

export const AppTagUpsertWithWhereUniqueWithoutAppsInputSchema: z.ZodType<Prisma.AppTagUpsertWithWhereUniqueWithoutAppsInput> = z.object({
  where: z.lazy(() => AppTagWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AppTagUpdateWithoutAppsInputSchema),z.lazy(() => AppTagUncheckedUpdateWithoutAppsInputSchema) ]),
  create: z.union([ z.lazy(() => AppTagCreateWithoutAppsInputSchema),z.lazy(() => AppTagUncheckedCreateWithoutAppsInputSchema) ]),
}).strict();

export default AppTagUpsertWithWhereUniqueWithoutAppsInputSchema;
