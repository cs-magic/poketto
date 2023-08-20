import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppTagWhereUniqueInputSchema } from './AppTagWhereUniqueInputSchema';
import { AppTagUpdateWithoutCreatorInputSchema } from './AppTagUpdateWithoutCreatorInputSchema';
import { AppTagUncheckedUpdateWithoutCreatorInputSchema } from './AppTagUncheckedUpdateWithoutCreatorInputSchema';
import { AppTagCreateWithoutCreatorInputSchema } from './AppTagCreateWithoutCreatorInputSchema';
import { AppTagUncheckedCreateWithoutCreatorInputSchema } from './AppTagUncheckedCreateWithoutCreatorInputSchema';

export const AppTagUpsertWithWhereUniqueWithoutCreatorInputSchema: z.ZodType<Prisma.AppTagUpsertWithWhereUniqueWithoutCreatorInput> = z.object({
  where: z.lazy(() => AppTagWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AppTagUpdateWithoutCreatorInputSchema),z.lazy(() => AppTagUncheckedUpdateWithoutCreatorInputSchema) ]),
  create: z.union([ z.lazy(() => AppTagCreateWithoutCreatorInputSchema),z.lazy(() => AppTagUncheckedCreateWithoutCreatorInputSchema) ]),
}).strict();

export default AppTagUpsertWithWhereUniqueWithoutCreatorInputSchema;
