import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppStateUpdateWithoutAppInputSchema } from './AppStateUpdateWithoutAppInputSchema';
import { AppStateUncheckedUpdateWithoutAppInputSchema } from './AppStateUncheckedUpdateWithoutAppInputSchema';
import { AppStateCreateWithoutAppInputSchema } from './AppStateCreateWithoutAppInputSchema';
import { AppStateUncheckedCreateWithoutAppInputSchema } from './AppStateUncheckedCreateWithoutAppInputSchema';
import { AppStateWhereInputSchema } from './AppStateWhereInputSchema';

export const AppStateUpsertWithoutAppInputSchema: z.ZodType<Prisma.AppStateUpsertWithoutAppInput> = z.object({
  update: z.union([ z.lazy(() => AppStateUpdateWithoutAppInputSchema),z.lazy(() => AppStateUncheckedUpdateWithoutAppInputSchema) ]),
  create: z.union([ z.lazy(() => AppStateCreateWithoutAppInputSchema),z.lazy(() => AppStateUncheckedCreateWithoutAppInputSchema) ]),
  where: z.lazy(() => AppStateWhereInputSchema).optional()
}).strict();

export default AppStateUpsertWithoutAppInputSchema;
