import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppUpdateWithoutActionsInputSchema } from './AppUpdateWithoutActionsInputSchema';
import { AppUncheckedUpdateWithoutActionsInputSchema } from './AppUncheckedUpdateWithoutActionsInputSchema';
import { AppCreateWithoutActionsInputSchema } from './AppCreateWithoutActionsInputSchema';
import { AppUncheckedCreateWithoutActionsInputSchema } from './AppUncheckedCreateWithoutActionsInputSchema';
import { AppWhereInputSchema } from './AppWhereInputSchema';

export const AppUpsertWithoutActionsInputSchema: z.ZodType<Prisma.AppUpsertWithoutActionsInput> = z.object({
  update: z.union([ z.lazy(() => AppUpdateWithoutActionsInputSchema),z.lazy(() => AppUncheckedUpdateWithoutActionsInputSchema) ]),
  create: z.union([ z.lazy(() => AppCreateWithoutActionsInputSchema),z.lazy(() => AppUncheckedCreateWithoutActionsInputSchema) ]),
  where: z.lazy(() => AppWhereInputSchema).optional()
}).strict();

export default AppUpsertWithoutActionsInputSchema;
