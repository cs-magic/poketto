import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppScalarWhereInputSchema } from './AppScalarWhereInputSchema';
import { AppUpdateManyMutationInputSchema } from './AppUpdateManyMutationInputSchema';
import { AppUncheckedUpdateManyWithoutTagsInputSchema } from './AppUncheckedUpdateManyWithoutTagsInputSchema';

export const AppUpdateManyWithWhereWithoutTagsInputSchema: z.ZodType<Prisma.AppUpdateManyWithWhereWithoutTagsInput> = z.object({
  where: z.lazy(() => AppScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AppUpdateManyMutationInputSchema),z.lazy(() => AppUncheckedUpdateManyWithoutTagsInputSchema) ]),
}).strict();

export default AppUpdateManyWithWhereWithoutTagsInputSchema;
