import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppTagScalarWhereInputSchema } from './AppTagScalarWhereInputSchema';
import { AppTagUpdateManyMutationInputSchema } from './AppTagUpdateManyMutationInputSchema';
import { AppTagUncheckedUpdateManyWithoutCreatorInputSchema } from './AppTagUncheckedUpdateManyWithoutCreatorInputSchema';

export const AppTagUpdateManyWithWhereWithoutCreatorInputSchema: z.ZodType<Prisma.AppTagUpdateManyWithWhereWithoutCreatorInput> = z.object({
  where: z.lazy(() => AppTagScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AppTagUpdateManyMutationInputSchema),z.lazy(() => AppTagUncheckedUpdateManyWithoutCreatorInputSchema) ]),
}).strict();

export default AppTagUpdateManyWithWhereWithoutCreatorInputSchema;
