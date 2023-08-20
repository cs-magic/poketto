import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppActionWhereUniqueInputSchema } from './AppActionWhereUniqueInputSchema';
import { AppActionUpdateWithoutUserInputSchema } from './AppActionUpdateWithoutUserInputSchema';
import { AppActionUncheckedUpdateWithoutUserInputSchema } from './AppActionUncheckedUpdateWithoutUserInputSchema';

export const AppActionUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AppActionUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => AppActionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AppActionUpdateWithoutUserInputSchema),z.lazy(() => AppActionUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export default AppActionUpdateWithWhereUniqueWithoutUserInputSchema;
