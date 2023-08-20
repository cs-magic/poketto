import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppStateWhereUniqueInputSchema } from './AppStateWhereUniqueInputSchema';
import { AppStateCreateWithoutAppInputSchema } from './AppStateCreateWithoutAppInputSchema';
import { AppStateUncheckedCreateWithoutAppInputSchema } from './AppStateUncheckedCreateWithoutAppInputSchema';

export const AppStateCreateOrConnectWithoutAppInputSchema: z.ZodType<Prisma.AppStateCreateOrConnectWithoutAppInput> = z.object({
  where: z.lazy(() => AppStateWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AppStateCreateWithoutAppInputSchema),z.lazy(() => AppStateUncheckedCreateWithoutAppInputSchema) ]),
}).strict();

export default AppStateCreateOrConnectWithoutAppInputSchema;
