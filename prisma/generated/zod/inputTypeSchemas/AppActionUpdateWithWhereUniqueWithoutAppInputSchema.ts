import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppActionWhereUniqueInputSchema } from './AppActionWhereUniqueInputSchema';
import { AppActionUpdateWithoutAppInputSchema } from './AppActionUpdateWithoutAppInputSchema';
import { AppActionUncheckedUpdateWithoutAppInputSchema } from './AppActionUncheckedUpdateWithoutAppInputSchema';

export const AppActionUpdateWithWhereUniqueWithoutAppInputSchema: z.ZodType<Prisma.AppActionUpdateWithWhereUniqueWithoutAppInput> = z.object({
  where: z.lazy(() => AppActionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AppActionUpdateWithoutAppInputSchema),z.lazy(() => AppActionUncheckedUpdateWithoutAppInputSchema) ]),
}).strict();

export default AppActionUpdateWithWhereUniqueWithoutAppInputSchema;
