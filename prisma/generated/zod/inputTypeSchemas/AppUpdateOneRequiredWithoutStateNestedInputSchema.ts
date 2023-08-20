import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppCreateWithoutStateInputSchema } from './AppCreateWithoutStateInputSchema';
import { AppUncheckedCreateWithoutStateInputSchema } from './AppUncheckedCreateWithoutStateInputSchema';
import { AppCreateOrConnectWithoutStateInputSchema } from './AppCreateOrConnectWithoutStateInputSchema';
import { AppUpsertWithoutStateInputSchema } from './AppUpsertWithoutStateInputSchema';
import { AppWhereUniqueInputSchema } from './AppWhereUniqueInputSchema';
import { AppUpdateToOneWithWhereWithoutStateInputSchema } from './AppUpdateToOneWithWhereWithoutStateInputSchema';
import { AppUpdateWithoutStateInputSchema } from './AppUpdateWithoutStateInputSchema';
import { AppUncheckedUpdateWithoutStateInputSchema } from './AppUncheckedUpdateWithoutStateInputSchema';

export const AppUpdateOneRequiredWithoutStateNestedInputSchema: z.ZodType<Prisma.AppUpdateOneRequiredWithoutStateNestedInput> = z.object({
  create: z.union([ z.lazy(() => AppCreateWithoutStateInputSchema),z.lazy(() => AppUncheckedCreateWithoutStateInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AppCreateOrConnectWithoutStateInputSchema).optional(),
  upsert: z.lazy(() => AppUpsertWithoutStateInputSchema).optional(),
  connect: z.lazy(() => AppWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => AppUpdateToOneWithWhereWithoutStateInputSchema),z.lazy(() => AppUpdateWithoutStateInputSchema),z.lazy(() => AppUncheckedUpdateWithoutStateInputSchema) ]).optional(),
}).strict();

export default AppUpdateOneRequiredWithoutStateNestedInputSchema;
