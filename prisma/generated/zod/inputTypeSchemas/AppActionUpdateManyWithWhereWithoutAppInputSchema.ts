import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppActionScalarWhereInputSchema } from './AppActionScalarWhereInputSchema';
import { AppActionUpdateManyMutationInputSchema } from './AppActionUpdateManyMutationInputSchema';
import { AppActionUncheckedUpdateManyWithoutAppInputSchema } from './AppActionUncheckedUpdateManyWithoutAppInputSchema';

export const AppActionUpdateManyWithWhereWithoutAppInputSchema: z.ZodType<Prisma.AppActionUpdateManyWithWhereWithoutAppInput> = z.object({
  where: z.lazy(() => AppActionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AppActionUpdateManyMutationInputSchema),z.lazy(() => AppActionUncheckedUpdateManyWithoutAppInputSchema) ]),
}).strict();

export default AppActionUpdateManyWithWhereWithoutAppInputSchema;
