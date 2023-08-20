import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppUpdateWithoutCommentsInputSchema } from './AppUpdateWithoutCommentsInputSchema';
import { AppUncheckedUpdateWithoutCommentsInputSchema } from './AppUncheckedUpdateWithoutCommentsInputSchema';
import { AppCreateWithoutCommentsInputSchema } from './AppCreateWithoutCommentsInputSchema';
import { AppUncheckedCreateWithoutCommentsInputSchema } from './AppUncheckedCreateWithoutCommentsInputSchema';
import { AppWhereInputSchema } from './AppWhereInputSchema';

export const AppUpsertWithoutCommentsInputSchema: z.ZodType<Prisma.AppUpsertWithoutCommentsInput> = z.object({
  update: z.union([ z.lazy(() => AppUpdateWithoutCommentsInputSchema),z.lazy(() => AppUncheckedUpdateWithoutCommentsInputSchema) ]),
  create: z.union([ z.lazy(() => AppCreateWithoutCommentsInputSchema),z.lazy(() => AppUncheckedCreateWithoutCommentsInputSchema) ]),
  where: z.lazy(() => AppWhereInputSchema).optional()
}).strict();

export default AppUpsertWithoutCommentsInputSchema;
