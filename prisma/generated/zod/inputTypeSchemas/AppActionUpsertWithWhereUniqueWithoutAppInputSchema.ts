import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppActionWhereUniqueInputSchema } from './AppActionWhereUniqueInputSchema';
import { AppActionUpdateWithoutAppInputSchema } from './AppActionUpdateWithoutAppInputSchema';
import { AppActionUncheckedUpdateWithoutAppInputSchema } from './AppActionUncheckedUpdateWithoutAppInputSchema';
import { AppActionCreateWithoutAppInputSchema } from './AppActionCreateWithoutAppInputSchema';
import { AppActionUncheckedCreateWithoutAppInputSchema } from './AppActionUncheckedCreateWithoutAppInputSchema';

export const AppActionUpsertWithWhereUniqueWithoutAppInputSchema: z.ZodType<Prisma.AppActionUpsertWithWhereUniqueWithoutAppInput> = z.object({
  where: z.lazy(() => AppActionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AppActionUpdateWithoutAppInputSchema),z.lazy(() => AppActionUncheckedUpdateWithoutAppInputSchema) ]),
  create: z.union([ z.lazy(() => AppActionCreateWithoutAppInputSchema),z.lazy(() => AppActionUncheckedCreateWithoutAppInputSchema) ]),
}).strict();

export default AppActionUpsertWithWhereUniqueWithoutAppInputSchema;
