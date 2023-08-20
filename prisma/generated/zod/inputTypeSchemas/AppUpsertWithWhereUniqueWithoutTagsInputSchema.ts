import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppWhereUniqueInputSchema } from './AppWhereUniqueInputSchema';
import { AppUpdateWithoutTagsInputSchema } from './AppUpdateWithoutTagsInputSchema';
import { AppUncheckedUpdateWithoutTagsInputSchema } from './AppUncheckedUpdateWithoutTagsInputSchema';
import { AppCreateWithoutTagsInputSchema } from './AppCreateWithoutTagsInputSchema';
import { AppUncheckedCreateWithoutTagsInputSchema } from './AppUncheckedCreateWithoutTagsInputSchema';

export const AppUpsertWithWhereUniqueWithoutTagsInputSchema: z.ZodType<Prisma.AppUpsertWithWhereUniqueWithoutTagsInput> = z.object({
  where: z.lazy(() => AppWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AppUpdateWithoutTagsInputSchema),z.lazy(() => AppUncheckedUpdateWithoutTagsInputSchema) ]),
  create: z.union([ z.lazy(() => AppCreateWithoutTagsInputSchema),z.lazy(() => AppUncheckedCreateWithoutTagsInputSchema) ]),
}).strict();

export default AppUpsertWithWhereUniqueWithoutTagsInputSchema;
