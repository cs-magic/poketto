import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppTagCreateWithoutAppsInputSchema } from './AppTagCreateWithoutAppsInputSchema';
import { AppTagUncheckedCreateWithoutAppsInputSchema } from './AppTagUncheckedCreateWithoutAppsInputSchema';
import { AppTagCreateOrConnectWithoutAppsInputSchema } from './AppTagCreateOrConnectWithoutAppsInputSchema';
import { AppTagWhereUniqueInputSchema } from './AppTagWhereUniqueInputSchema';

export const AppTagCreateNestedManyWithoutAppsInputSchema: z.ZodType<Prisma.AppTagCreateNestedManyWithoutAppsInput> = z.object({
  create: z.union([ z.lazy(() => AppTagCreateWithoutAppsInputSchema),z.lazy(() => AppTagCreateWithoutAppsInputSchema).array(),z.lazy(() => AppTagUncheckedCreateWithoutAppsInputSchema),z.lazy(() => AppTagUncheckedCreateWithoutAppsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AppTagCreateOrConnectWithoutAppsInputSchema),z.lazy(() => AppTagCreateOrConnectWithoutAppsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AppTagWhereUniqueInputSchema),z.lazy(() => AppTagWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default AppTagCreateNestedManyWithoutAppsInputSchema;
