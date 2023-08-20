import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppScalarWhereInputSchema } from './AppScalarWhereInputSchema';
import { AppUpdateManyMutationInputSchema } from './AppUpdateManyMutationInputSchema';
import { AppUncheckedUpdateManyWithoutCategoryInputSchema } from './AppUncheckedUpdateManyWithoutCategoryInputSchema';

export const AppUpdateManyWithWhereWithoutCategoryInputSchema: z.ZodType<Prisma.AppUpdateManyWithWhereWithoutCategoryInput> = z.object({
  where: z.lazy(() => AppScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AppUpdateManyMutationInputSchema),z.lazy(() => AppUncheckedUpdateManyWithoutCategoryInputSchema) ]),
}).strict();

export default AppUpdateManyWithWhereWithoutCategoryInputSchema;
