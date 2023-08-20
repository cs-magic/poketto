import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppWhereUniqueInputSchema } from './AppWhereUniqueInputSchema';
import { AppUpdateWithoutCategoryInputSchema } from './AppUpdateWithoutCategoryInputSchema';
import { AppUncheckedUpdateWithoutCategoryInputSchema } from './AppUncheckedUpdateWithoutCategoryInputSchema';

export const AppUpdateWithWhereUniqueWithoutCategoryInputSchema: z.ZodType<Prisma.AppUpdateWithWhereUniqueWithoutCategoryInput> = z.object({
  where: z.lazy(() => AppWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AppUpdateWithoutCategoryInputSchema),z.lazy(() => AppUncheckedUpdateWithoutCategoryInputSchema) ]),
}).strict();

export default AppUpdateWithWhereUniqueWithoutCategoryInputSchema;
