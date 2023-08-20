import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppActionScalarWhereInputSchema } from './AppActionScalarWhereInputSchema';
import { AppActionUpdateManyMutationInputSchema } from './AppActionUpdateManyMutationInputSchema';
import { AppActionUncheckedUpdateManyWithoutUserInputSchema } from './AppActionUncheckedUpdateManyWithoutUserInputSchema';

export const AppActionUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.AppActionUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => AppActionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AppActionUpdateManyMutationInputSchema),z.lazy(() => AppActionUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export default AppActionUpdateManyWithWhereWithoutUserInputSchema;
