import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppStateWhereInputSchema } from './AppStateWhereInputSchema';
import { AppStateUpdateWithoutAppInputSchema } from './AppStateUpdateWithoutAppInputSchema';
import { AppStateUncheckedUpdateWithoutAppInputSchema } from './AppStateUncheckedUpdateWithoutAppInputSchema';

export const AppStateUpdateToOneWithWhereWithoutAppInputSchema: z.ZodType<Prisma.AppStateUpdateToOneWithWhereWithoutAppInput> = z.object({
  where: z.lazy(() => AppStateWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => AppStateUpdateWithoutAppInputSchema),z.lazy(() => AppStateUncheckedUpdateWithoutAppInputSchema) ]),
}).strict();

export default AppStateUpdateToOneWithWhereWithoutAppInputSchema;
