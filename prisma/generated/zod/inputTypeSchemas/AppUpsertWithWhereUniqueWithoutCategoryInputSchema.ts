import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppWhereUniqueInputSchema } from './AppWhereUniqueInputSchema';
import { AppUpdateWithoutCategoryInputSchema } from './AppUpdateWithoutCategoryInputSchema';
import { AppUncheckedUpdateWithoutCategoryInputSchema } from './AppUncheckedUpdateWithoutCategoryInputSchema';
import { AppCreateWithoutCategoryInputSchema } from './AppCreateWithoutCategoryInputSchema';
import { AppUncheckedCreateWithoutCategoryInputSchema } from './AppUncheckedCreateWithoutCategoryInputSchema';

export const AppUpsertWithWhereUniqueWithoutCategoryInputSchema: z.ZodType<Prisma.AppUpsertWithWhereUniqueWithoutCategoryInput> = z.object({
  where: z.lazy(() => AppWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AppUpdateWithoutCategoryInputSchema),z.lazy(() => AppUncheckedUpdateWithoutCategoryInputSchema) ]),
  create: z.union([ z.lazy(() => AppCreateWithoutCategoryInputSchema),z.lazy(() => AppUncheckedCreateWithoutCategoryInputSchema) ]),
}).strict();

export default AppUpsertWithWhereUniqueWithoutCategoryInputSchema;
