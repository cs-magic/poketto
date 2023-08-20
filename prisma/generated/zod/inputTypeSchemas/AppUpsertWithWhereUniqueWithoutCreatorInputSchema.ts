import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppWhereUniqueInputSchema } from './AppWhereUniqueInputSchema';
import { AppUpdateWithoutCreatorInputSchema } from './AppUpdateWithoutCreatorInputSchema';
import { AppUncheckedUpdateWithoutCreatorInputSchema } from './AppUncheckedUpdateWithoutCreatorInputSchema';
import { AppCreateWithoutCreatorInputSchema } from './AppCreateWithoutCreatorInputSchema';
import { AppUncheckedCreateWithoutCreatorInputSchema } from './AppUncheckedCreateWithoutCreatorInputSchema';

export const AppUpsertWithWhereUniqueWithoutCreatorInputSchema: z.ZodType<Prisma.AppUpsertWithWhereUniqueWithoutCreatorInput> = z.object({
  where: z.lazy(() => AppWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AppUpdateWithoutCreatorInputSchema),z.lazy(() => AppUncheckedUpdateWithoutCreatorInputSchema) ]),
  create: z.union([ z.lazy(() => AppCreateWithoutCreatorInputSchema),z.lazy(() => AppUncheckedCreateWithoutCreatorInputSchema) ]),
}).strict();

export default AppUpsertWithWhereUniqueWithoutCreatorInputSchema;
