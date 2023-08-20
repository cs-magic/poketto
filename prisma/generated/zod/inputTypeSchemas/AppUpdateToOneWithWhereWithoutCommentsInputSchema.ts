import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppWhereInputSchema } from './AppWhereInputSchema';
import { AppUpdateWithoutCommentsInputSchema } from './AppUpdateWithoutCommentsInputSchema';
import { AppUncheckedUpdateWithoutCommentsInputSchema } from './AppUncheckedUpdateWithoutCommentsInputSchema';

export const AppUpdateToOneWithWhereWithoutCommentsInputSchema: z.ZodType<Prisma.AppUpdateToOneWithWhereWithoutCommentsInput> = z.object({
  where: z.lazy(() => AppWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => AppUpdateWithoutCommentsInputSchema),z.lazy(() => AppUncheckedUpdateWithoutCommentsInputSchema) ]),
}).strict();

export default AppUpdateToOneWithWhereWithoutCommentsInputSchema;
