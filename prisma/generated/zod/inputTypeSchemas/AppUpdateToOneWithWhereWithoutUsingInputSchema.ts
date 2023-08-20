import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppWhereInputSchema } from './AppWhereInputSchema';
import { AppUpdateWithoutUsingInputSchema } from './AppUpdateWithoutUsingInputSchema';
import { AppUncheckedUpdateWithoutUsingInputSchema } from './AppUncheckedUpdateWithoutUsingInputSchema';

export const AppUpdateToOneWithWhereWithoutUsingInputSchema: z.ZodType<Prisma.AppUpdateToOneWithWhereWithoutUsingInput> = z.object({
  where: z.lazy(() => AppWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => AppUpdateWithoutUsingInputSchema),z.lazy(() => AppUncheckedUpdateWithoutUsingInputSchema) ]),
}).strict();

export default AppUpdateToOneWithWhereWithoutUsingInputSchema;
