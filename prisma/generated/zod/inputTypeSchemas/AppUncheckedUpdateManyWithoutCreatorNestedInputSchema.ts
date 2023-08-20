import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppCreateWithoutCreatorInputSchema } from './AppCreateWithoutCreatorInputSchema';
import { AppUncheckedCreateWithoutCreatorInputSchema } from './AppUncheckedCreateWithoutCreatorInputSchema';
import { AppCreateOrConnectWithoutCreatorInputSchema } from './AppCreateOrConnectWithoutCreatorInputSchema';
import { AppUpsertWithWhereUniqueWithoutCreatorInputSchema } from './AppUpsertWithWhereUniqueWithoutCreatorInputSchema';
import { AppCreateManyCreatorInputEnvelopeSchema } from './AppCreateManyCreatorInputEnvelopeSchema';
import { AppWhereUniqueInputSchema } from './AppWhereUniqueInputSchema';
import { AppUpdateWithWhereUniqueWithoutCreatorInputSchema } from './AppUpdateWithWhereUniqueWithoutCreatorInputSchema';
import { AppUpdateManyWithWhereWithoutCreatorInputSchema } from './AppUpdateManyWithWhereWithoutCreatorInputSchema';
import { AppScalarWhereInputSchema } from './AppScalarWhereInputSchema';

export const AppUncheckedUpdateManyWithoutCreatorNestedInputSchema: z.ZodType<Prisma.AppUncheckedUpdateManyWithoutCreatorNestedInput> = z.object({
  create: z.union([ z.lazy(() => AppCreateWithoutCreatorInputSchema),z.lazy(() => AppCreateWithoutCreatorInputSchema).array(),z.lazy(() => AppUncheckedCreateWithoutCreatorInputSchema),z.lazy(() => AppUncheckedCreateWithoutCreatorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AppCreateOrConnectWithoutCreatorInputSchema),z.lazy(() => AppCreateOrConnectWithoutCreatorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AppUpsertWithWhereUniqueWithoutCreatorInputSchema),z.lazy(() => AppUpsertWithWhereUniqueWithoutCreatorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AppCreateManyCreatorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AppWhereUniqueInputSchema),z.lazy(() => AppWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AppWhereUniqueInputSchema),z.lazy(() => AppWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AppWhereUniqueInputSchema),z.lazy(() => AppWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AppWhereUniqueInputSchema),z.lazy(() => AppWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AppUpdateWithWhereUniqueWithoutCreatorInputSchema),z.lazy(() => AppUpdateWithWhereUniqueWithoutCreatorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AppUpdateManyWithWhereWithoutCreatorInputSchema),z.lazy(() => AppUpdateManyWithWhereWithoutCreatorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AppScalarWhereInputSchema),z.lazy(() => AppScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default AppUncheckedUpdateManyWithoutCreatorNestedInputSchema;
