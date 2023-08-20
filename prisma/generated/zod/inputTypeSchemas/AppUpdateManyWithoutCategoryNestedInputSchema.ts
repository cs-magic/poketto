import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppCreateWithoutCategoryInputSchema } from './AppCreateWithoutCategoryInputSchema';
import { AppUncheckedCreateWithoutCategoryInputSchema } from './AppUncheckedCreateWithoutCategoryInputSchema';
import { AppCreateOrConnectWithoutCategoryInputSchema } from './AppCreateOrConnectWithoutCategoryInputSchema';
import { AppUpsertWithWhereUniqueWithoutCategoryInputSchema } from './AppUpsertWithWhereUniqueWithoutCategoryInputSchema';
import { AppCreateManyCategoryInputEnvelopeSchema } from './AppCreateManyCategoryInputEnvelopeSchema';
import { AppWhereUniqueInputSchema } from './AppWhereUniqueInputSchema';
import { AppUpdateWithWhereUniqueWithoutCategoryInputSchema } from './AppUpdateWithWhereUniqueWithoutCategoryInputSchema';
import { AppUpdateManyWithWhereWithoutCategoryInputSchema } from './AppUpdateManyWithWhereWithoutCategoryInputSchema';
import { AppScalarWhereInputSchema } from './AppScalarWhereInputSchema';

export const AppUpdateManyWithoutCategoryNestedInputSchema: z.ZodType<Prisma.AppUpdateManyWithoutCategoryNestedInput> = z.object({
  create: z.union([ z.lazy(() => AppCreateWithoutCategoryInputSchema),z.lazy(() => AppCreateWithoutCategoryInputSchema).array(),z.lazy(() => AppUncheckedCreateWithoutCategoryInputSchema),z.lazy(() => AppUncheckedCreateWithoutCategoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AppCreateOrConnectWithoutCategoryInputSchema),z.lazy(() => AppCreateOrConnectWithoutCategoryInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AppUpsertWithWhereUniqueWithoutCategoryInputSchema),z.lazy(() => AppUpsertWithWhereUniqueWithoutCategoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AppCreateManyCategoryInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AppWhereUniqueInputSchema),z.lazy(() => AppWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AppWhereUniqueInputSchema),z.lazy(() => AppWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AppWhereUniqueInputSchema),z.lazy(() => AppWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AppWhereUniqueInputSchema),z.lazy(() => AppWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AppUpdateWithWhereUniqueWithoutCategoryInputSchema),z.lazy(() => AppUpdateWithWhereUniqueWithoutCategoryInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AppUpdateManyWithWhereWithoutCategoryInputSchema),z.lazy(() => AppUpdateManyWithWhereWithoutCategoryInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AppScalarWhereInputSchema),z.lazy(() => AppScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default AppUpdateManyWithoutCategoryNestedInputSchema;
