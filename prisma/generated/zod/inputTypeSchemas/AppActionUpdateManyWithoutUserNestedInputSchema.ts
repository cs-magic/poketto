import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppActionCreateWithoutUserInputSchema } from './AppActionCreateWithoutUserInputSchema';
import { AppActionUncheckedCreateWithoutUserInputSchema } from './AppActionUncheckedCreateWithoutUserInputSchema';
import { AppActionCreateOrConnectWithoutUserInputSchema } from './AppActionCreateOrConnectWithoutUserInputSchema';
import { AppActionUpsertWithWhereUniqueWithoutUserInputSchema } from './AppActionUpsertWithWhereUniqueWithoutUserInputSchema';
import { AppActionCreateManyUserInputEnvelopeSchema } from './AppActionCreateManyUserInputEnvelopeSchema';
import { AppActionWhereUniqueInputSchema } from './AppActionWhereUniqueInputSchema';
import { AppActionUpdateWithWhereUniqueWithoutUserInputSchema } from './AppActionUpdateWithWhereUniqueWithoutUserInputSchema';
import { AppActionUpdateManyWithWhereWithoutUserInputSchema } from './AppActionUpdateManyWithWhereWithoutUserInputSchema';
import { AppActionScalarWhereInputSchema } from './AppActionScalarWhereInputSchema';

export const AppActionUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AppActionUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => AppActionCreateWithoutUserInputSchema),z.lazy(() => AppActionCreateWithoutUserInputSchema).array(),z.lazy(() => AppActionUncheckedCreateWithoutUserInputSchema),z.lazy(() => AppActionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AppActionCreateOrConnectWithoutUserInputSchema),z.lazy(() => AppActionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AppActionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AppActionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AppActionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AppActionWhereUniqueInputSchema),z.lazy(() => AppActionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AppActionWhereUniqueInputSchema),z.lazy(() => AppActionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AppActionWhereUniqueInputSchema),z.lazy(() => AppActionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AppActionWhereUniqueInputSchema),z.lazy(() => AppActionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AppActionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AppActionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AppActionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => AppActionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AppActionScalarWhereInputSchema),z.lazy(() => AppActionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default AppActionUpdateManyWithoutUserNestedInputSchema;
