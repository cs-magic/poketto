import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppUpdateWithoutUsingInputSchema } from './AppUpdateWithoutUsingInputSchema';
import { AppUncheckedUpdateWithoutUsingInputSchema } from './AppUncheckedUpdateWithoutUsingInputSchema';
import { AppCreateWithoutUsingInputSchema } from './AppCreateWithoutUsingInputSchema';
import { AppUncheckedCreateWithoutUsingInputSchema } from './AppUncheckedCreateWithoutUsingInputSchema';
import { AppWhereInputSchema } from './AppWhereInputSchema';

export const AppUpsertWithoutUsingInputSchema: z.ZodType<Prisma.AppUpsertWithoutUsingInput> = z.object({
  update: z.union([ z.lazy(() => AppUpdateWithoutUsingInputSchema),z.lazy(() => AppUncheckedUpdateWithoutUsingInputSchema) ]),
  create: z.union([ z.lazy(() => AppCreateWithoutUsingInputSchema),z.lazy(() => AppUncheckedCreateWithoutUsingInputSchema) ]),
  where: z.lazy(() => AppWhereInputSchema).optional()
}).strict();

export default AppUpsertWithoutUsingInputSchema;
