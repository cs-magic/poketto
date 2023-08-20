import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppCreateWithoutTagsInputSchema } from './AppCreateWithoutTagsInputSchema';
import { AppUncheckedCreateWithoutTagsInputSchema } from './AppUncheckedCreateWithoutTagsInputSchema';
import { AppCreateOrConnectWithoutTagsInputSchema } from './AppCreateOrConnectWithoutTagsInputSchema';
import { AppUpsertWithWhereUniqueWithoutTagsInputSchema } from './AppUpsertWithWhereUniqueWithoutTagsInputSchema';
import { AppWhereUniqueInputSchema } from './AppWhereUniqueInputSchema';
import { AppUpdateWithWhereUniqueWithoutTagsInputSchema } from './AppUpdateWithWhereUniqueWithoutTagsInputSchema';
import { AppUpdateManyWithWhereWithoutTagsInputSchema } from './AppUpdateManyWithWhereWithoutTagsInputSchema';
import { AppScalarWhereInputSchema } from './AppScalarWhereInputSchema';

export const AppUncheckedUpdateManyWithoutTagsNestedInputSchema: z.ZodType<Prisma.AppUncheckedUpdateManyWithoutTagsNestedInput> = z.object({
  create: z.union([ z.lazy(() => AppCreateWithoutTagsInputSchema),z.lazy(() => AppCreateWithoutTagsInputSchema).array(),z.lazy(() => AppUncheckedCreateWithoutTagsInputSchema),z.lazy(() => AppUncheckedCreateWithoutTagsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AppCreateOrConnectWithoutTagsInputSchema),z.lazy(() => AppCreateOrConnectWithoutTagsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AppUpsertWithWhereUniqueWithoutTagsInputSchema),z.lazy(() => AppUpsertWithWhereUniqueWithoutTagsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => AppWhereUniqueInputSchema),z.lazy(() => AppWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AppWhereUniqueInputSchema),z.lazy(() => AppWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AppWhereUniqueInputSchema),z.lazy(() => AppWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AppWhereUniqueInputSchema),z.lazy(() => AppWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AppUpdateWithWhereUniqueWithoutTagsInputSchema),z.lazy(() => AppUpdateWithWhereUniqueWithoutTagsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AppUpdateManyWithWhereWithoutTagsInputSchema),z.lazy(() => AppUpdateManyWithWhereWithoutTagsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AppScalarWhereInputSchema),z.lazy(() => AppScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default AppUncheckedUpdateManyWithoutTagsNestedInputSchema;
