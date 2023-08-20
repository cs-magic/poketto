import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppTagScalarWhereInputSchema } from './AppTagScalarWhereInputSchema';
import { AppTagUpdateManyMutationInputSchema } from './AppTagUpdateManyMutationInputSchema';
import { AppTagUncheckedUpdateManyWithoutAppsInputSchema } from './AppTagUncheckedUpdateManyWithoutAppsInputSchema';

export const AppTagUpdateManyWithWhereWithoutAppsInputSchema: z.ZodType<Prisma.AppTagUpdateManyWithWhereWithoutAppsInput> = z.object({
  where: z.lazy(() => AppTagScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AppTagUpdateManyMutationInputSchema),z.lazy(() => AppTagUncheckedUpdateManyWithoutAppsInputSchema) ]),
}).strict();

export default AppTagUpdateManyWithWhereWithoutAppsInputSchema;
