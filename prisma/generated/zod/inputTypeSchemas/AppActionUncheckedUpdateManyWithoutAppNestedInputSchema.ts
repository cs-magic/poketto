import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppActionCreateWithoutAppInputSchema } from './AppActionCreateWithoutAppInputSchema';
import { AppActionUncheckedCreateWithoutAppInputSchema } from './AppActionUncheckedCreateWithoutAppInputSchema';
import { AppActionCreateOrConnectWithoutAppInputSchema } from './AppActionCreateOrConnectWithoutAppInputSchema';
import { AppActionUpsertWithWhereUniqueWithoutAppInputSchema } from './AppActionUpsertWithWhereUniqueWithoutAppInputSchema';
import { AppActionCreateManyAppInputEnvelopeSchema } from './AppActionCreateManyAppInputEnvelopeSchema';
import { AppActionWhereUniqueInputSchema } from './AppActionWhereUniqueInputSchema';
import { AppActionUpdateWithWhereUniqueWithoutAppInputSchema } from './AppActionUpdateWithWhereUniqueWithoutAppInputSchema';
import { AppActionUpdateManyWithWhereWithoutAppInputSchema } from './AppActionUpdateManyWithWhereWithoutAppInputSchema';
import { AppActionScalarWhereInputSchema } from './AppActionScalarWhereInputSchema';

export const AppActionUncheckedUpdateManyWithoutAppNestedInputSchema: z.ZodType<Prisma.AppActionUncheckedUpdateManyWithoutAppNestedInput> = z.object({
  create: z.union([ z.lazy(() => AppActionCreateWithoutAppInputSchema),z.lazy(() => AppActionCreateWithoutAppInputSchema).array(),z.lazy(() => AppActionUncheckedCreateWithoutAppInputSchema),z.lazy(() => AppActionUncheckedCreateWithoutAppInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AppActionCreateOrConnectWithoutAppInputSchema),z.lazy(() => AppActionCreateOrConnectWithoutAppInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AppActionUpsertWithWhereUniqueWithoutAppInputSchema),z.lazy(() => AppActionUpsertWithWhereUniqueWithoutAppInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AppActionCreateManyAppInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AppActionWhereUniqueInputSchema),z.lazy(() => AppActionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AppActionWhereUniqueInputSchema),z.lazy(() => AppActionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AppActionWhereUniqueInputSchema),z.lazy(() => AppActionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AppActionWhereUniqueInputSchema),z.lazy(() => AppActionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AppActionUpdateWithWhereUniqueWithoutAppInputSchema),z.lazy(() => AppActionUpdateWithWhereUniqueWithoutAppInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AppActionUpdateManyWithWhereWithoutAppInputSchema),z.lazy(() => AppActionUpdateManyWithWhereWithoutAppInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AppActionScalarWhereInputSchema),z.lazy(() => AppActionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default AppActionUncheckedUpdateManyWithoutAppNestedInputSchema;
