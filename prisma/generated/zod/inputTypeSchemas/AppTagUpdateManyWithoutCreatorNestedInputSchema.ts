import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppTagCreateWithoutCreatorInputSchema } from './AppTagCreateWithoutCreatorInputSchema';
import { AppTagUncheckedCreateWithoutCreatorInputSchema } from './AppTagUncheckedCreateWithoutCreatorInputSchema';
import { AppTagCreateOrConnectWithoutCreatorInputSchema } from './AppTagCreateOrConnectWithoutCreatorInputSchema';
import { AppTagUpsertWithWhereUniqueWithoutCreatorInputSchema } from './AppTagUpsertWithWhereUniqueWithoutCreatorInputSchema';
import { AppTagCreateManyCreatorInputEnvelopeSchema } from './AppTagCreateManyCreatorInputEnvelopeSchema';
import { AppTagWhereUniqueInputSchema } from './AppTagWhereUniqueInputSchema';
import { AppTagUpdateWithWhereUniqueWithoutCreatorInputSchema } from './AppTagUpdateWithWhereUniqueWithoutCreatorInputSchema';
import { AppTagUpdateManyWithWhereWithoutCreatorInputSchema } from './AppTagUpdateManyWithWhereWithoutCreatorInputSchema';
import { AppTagScalarWhereInputSchema } from './AppTagScalarWhereInputSchema';

export const AppTagUpdateManyWithoutCreatorNestedInputSchema: z.ZodType<Prisma.AppTagUpdateManyWithoutCreatorNestedInput> = z.object({
  create: z.union([ z.lazy(() => AppTagCreateWithoutCreatorInputSchema),z.lazy(() => AppTagCreateWithoutCreatorInputSchema).array(),z.lazy(() => AppTagUncheckedCreateWithoutCreatorInputSchema),z.lazy(() => AppTagUncheckedCreateWithoutCreatorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AppTagCreateOrConnectWithoutCreatorInputSchema),z.lazy(() => AppTagCreateOrConnectWithoutCreatorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AppTagUpsertWithWhereUniqueWithoutCreatorInputSchema),z.lazy(() => AppTagUpsertWithWhereUniqueWithoutCreatorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AppTagCreateManyCreatorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AppTagWhereUniqueInputSchema),z.lazy(() => AppTagWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AppTagWhereUniqueInputSchema),z.lazy(() => AppTagWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AppTagWhereUniqueInputSchema),z.lazy(() => AppTagWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AppTagWhereUniqueInputSchema),z.lazy(() => AppTagWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AppTagUpdateWithWhereUniqueWithoutCreatorInputSchema),z.lazy(() => AppTagUpdateWithWhereUniqueWithoutCreatorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AppTagUpdateManyWithWhereWithoutCreatorInputSchema),z.lazy(() => AppTagUpdateManyWithWhereWithoutCreatorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AppTagScalarWhereInputSchema),z.lazy(() => AppTagScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default AppTagUpdateManyWithoutCreatorNestedInputSchema;
