import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppWhereInputSchema } from './AppWhereInputSchema';
import { AppUpdateWithoutActionsInputSchema } from './AppUpdateWithoutActionsInputSchema';
import { AppUncheckedUpdateWithoutActionsInputSchema } from './AppUncheckedUpdateWithoutActionsInputSchema';

export const AppUpdateToOneWithWhereWithoutActionsInputSchema: z.ZodType<Prisma.AppUpdateToOneWithWhereWithoutActionsInput> = z.object({
  where: z.lazy(() => AppWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => AppUpdateWithoutActionsInputSchema),z.lazy(() => AppUncheckedUpdateWithoutActionsInputSchema) ]),
}).strict();

export default AppUpdateToOneWithWhereWithoutActionsInputSchema;
