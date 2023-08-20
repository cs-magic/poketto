import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppScalarWhereInputSchema } from './AppScalarWhereInputSchema';
import { AppUpdateManyMutationInputSchema } from './AppUpdateManyMutationInputSchema';
import { AppUncheckedUpdateManyWithoutCreatorInputSchema } from './AppUncheckedUpdateManyWithoutCreatorInputSchema';

export const AppUpdateManyWithWhereWithoutCreatorInputSchema: z.ZodType<Prisma.AppUpdateManyWithWhereWithoutCreatorInput> = z.object({
  where: z.lazy(() => AppScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AppUpdateManyMutationInputSchema),z.lazy(() => AppUncheckedUpdateManyWithoutCreatorInputSchema) ]),
}).strict();

export default AppUpdateManyWithWhereWithoutCreatorInputSchema;
