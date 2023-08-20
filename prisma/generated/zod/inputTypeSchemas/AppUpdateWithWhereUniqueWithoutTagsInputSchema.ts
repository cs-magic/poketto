import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppWhereUniqueInputSchema } from './AppWhereUniqueInputSchema';
import { AppUpdateWithoutTagsInputSchema } from './AppUpdateWithoutTagsInputSchema';
import { AppUncheckedUpdateWithoutTagsInputSchema } from './AppUncheckedUpdateWithoutTagsInputSchema';

export const AppUpdateWithWhereUniqueWithoutTagsInputSchema: z.ZodType<Prisma.AppUpdateWithWhereUniqueWithoutTagsInput> = z.object({
  where: z.lazy(() => AppWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AppUpdateWithoutTagsInputSchema),z.lazy(() => AppUncheckedUpdateWithoutTagsInputSchema) ]),
}).strict();

export default AppUpdateWithWhereUniqueWithoutTagsInputSchema;
