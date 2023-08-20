import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppTagWhereUniqueInputSchema } from './AppTagWhereUniqueInputSchema';
import { AppTagUpdateWithoutCreatorInputSchema } from './AppTagUpdateWithoutCreatorInputSchema';
import { AppTagUncheckedUpdateWithoutCreatorInputSchema } from './AppTagUncheckedUpdateWithoutCreatorInputSchema';

export const AppTagUpdateWithWhereUniqueWithoutCreatorInputSchema: z.ZodType<Prisma.AppTagUpdateWithWhereUniqueWithoutCreatorInput> = z.object({
  where: z.lazy(() => AppTagWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AppTagUpdateWithoutCreatorInputSchema),z.lazy(() => AppTagUncheckedUpdateWithoutCreatorInputSchema) ]),
}).strict();

export default AppTagUpdateWithWhereUniqueWithoutCreatorInputSchema;
