import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppTagWhereUniqueInputSchema } from './AppTagWhereUniqueInputSchema';
import { AppTagCreateWithoutAppsInputSchema } from './AppTagCreateWithoutAppsInputSchema';
import { AppTagUncheckedCreateWithoutAppsInputSchema } from './AppTagUncheckedCreateWithoutAppsInputSchema';

export const AppTagCreateOrConnectWithoutAppsInputSchema: z.ZodType<Prisma.AppTagCreateOrConnectWithoutAppsInput> = z.object({
  where: z.lazy(() => AppTagWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AppTagCreateWithoutAppsInputSchema),z.lazy(() => AppTagUncheckedCreateWithoutAppsInputSchema) ]),
}).strict();

export default AppTagCreateOrConnectWithoutAppsInputSchema;
