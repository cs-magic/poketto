import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppTagCreateWithoutAppsInputSchema } from './AppTagCreateWithoutAppsInputSchema';
import { AppTagUncheckedCreateWithoutAppsInputSchema } from './AppTagUncheckedCreateWithoutAppsInputSchema';
import { AppTagCreateOrConnectWithoutAppsInputSchema } from './AppTagCreateOrConnectWithoutAppsInputSchema';
import { AppTagUpsertWithWhereUniqueWithoutAppsInputSchema } from './AppTagUpsertWithWhereUniqueWithoutAppsInputSchema';
import { AppTagWhereUniqueInputSchema } from './AppTagWhereUniqueInputSchema';
import { AppTagUpdateWithWhereUniqueWithoutAppsInputSchema } from './AppTagUpdateWithWhereUniqueWithoutAppsInputSchema';
import { AppTagUpdateManyWithWhereWithoutAppsInputSchema } from './AppTagUpdateManyWithWhereWithoutAppsInputSchema';
import { AppTagScalarWhereInputSchema } from './AppTagScalarWhereInputSchema';

export const AppTagUncheckedUpdateManyWithoutAppsNestedInputSchema: z.ZodType<Prisma.AppTagUncheckedUpdateManyWithoutAppsNestedInput> = z.object({
  create: z.union([ z.lazy(() => AppTagCreateWithoutAppsInputSchema),z.lazy(() => AppTagCreateWithoutAppsInputSchema).array(),z.lazy(() => AppTagUncheckedCreateWithoutAppsInputSchema),z.lazy(() => AppTagUncheckedCreateWithoutAppsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AppTagCreateOrConnectWithoutAppsInputSchema),z.lazy(() => AppTagCreateOrConnectWithoutAppsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AppTagUpsertWithWhereUniqueWithoutAppsInputSchema),z.lazy(() => AppTagUpsertWithWhereUniqueWithoutAppsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => AppTagWhereUniqueInputSchema),z.lazy(() => AppTagWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AppTagWhereUniqueInputSchema),z.lazy(() => AppTagWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AppTagWhereUniqueInputSchema),z.lazy(() => AppTagWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AppTagWhereUniqueInputSchema),z.lazy(() => AppTagWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AppTagUpdateWithWhereUniqueWithoutAppsInputSchema),z.lazy(() => AppTagUpdateWithWhereUniqueWithoutAppsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AppTagUpdateManyWithWhereWithoutAppsInputSchema),z.lazy(() => AppTagUpdateManyWithWhereWithoutAppsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AppTagScalarWhereInputSchema),z.lazy(() => AppTagScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default AppTagUncheckedUpdateManyWithoutAppsNestedInputSchema;
