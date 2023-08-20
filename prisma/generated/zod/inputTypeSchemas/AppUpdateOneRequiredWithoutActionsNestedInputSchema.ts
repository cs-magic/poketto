import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppCreateWithoutActionsInputSchema } from './AppCreateWithoutActionsInputSchema';
import { AppUncheckedCreateWithoutActionsInputSchema } from './AppUncheckedCreateWithoutActionsInputSchema';
import { AppCreateOrConnectWithoutActionsInputSchema } from './AppCreateOrConnectWithoutActionsInputSchema';
import { AppUpsertWithoutActionsInputSchema } from './AppUpsertWithoutActionsInputSchema';
import { AppWhereUniqueInputSchema } from './AppWhereUniqueInputSchema';
import { AppUpdateToOneWithWhereWithoutActionsInputSchema } from './AppUpdateToOneWithWhereWithoutActionsInputSchema';
import { AppUpdateWithoutActionsInputSchema } from './AppUpdateWithoutActionsInputSchema';
import { AppUncheckedUpdateWithoutActionsInputSchema } from './AppUncheckedUpdateWithoutActionsInputSchema';

export const AppUpdateOneRequiredWithoutActionsNestedInputSchema: z.ZodType<Prisma.AppUpdateOneRequiredWithoutActionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => AppCreateWithoutActionsInputSchema),z.lazy(() => AppUncheckedCreateWithoutActionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AppCreateOrConnectWithoutActionsInputSchema).optional(),
  upsert: z.lazy(() => AppUpsertWithoutActionsInputSchema).optional(),
  connect: z.lazy(() => AppWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => AppUpdateToOneWithWhereWithoutActionsInputSchema),z.lazy(() => AppUpdateWithoutActionsInputSchema),z.lazy(() => AppUncheckedUpdateWithoutActionsInputSchema) ]).optional(),
}).strict();

export default AppUpdateOneRequiredWithoutActionsNestedInputSchema;
