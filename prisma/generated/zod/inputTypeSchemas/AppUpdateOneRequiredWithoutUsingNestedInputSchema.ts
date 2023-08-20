import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppCreateWithoutUsingInputSchema } from './AppCreateWithoutUsingInputSchema';
import { AppUncheckedCreateWithoutUsingInputSchema } from './AppUncheckedCreateWithoutUsingInputSchema';
import { AppCreateOrConnectWithoutUsingInputSchema } from './AppCreateOrConnectWithoutUsingInputSchema';
import { AppUpsertWithoutUsingInputSchema } from './AppUpsertWithoutUsingInputSchema';
import { AppWhereUniqueInputSchema } from './AppWhereUniqueInputSchema';
import { AppUpdateToOneWithWhereWithoutUsingInputSchema } from './AppUpdateToOneWithWhereWithoutUsingInputSchema';
import { AppUpdateWithoutUsingInputSchema } from './AppUpdateWithoutUsingInputSchema';
import { AppUncheckedUpdateWithoutUsingInputSchema } from './AppUncheckedUpdateWithoutUsingInputSchema';

export const AppUpdateOneRequiredWithoutUsingNestedInputSchema: z.ZodType<Prisma.AppUpdateOneRequiredWithoutUsingNestedInput> = z.object({
  create: z.union([ z.lazy(() => AppCreateWithoutUsingInputSchema),z.lazy(() => AppUncheckedCreateWithoutUsingInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AppCreateOrConnectWithoutUsingInputSchema).optional(),
  upsert: z.lazy(() => AppUpsertWithoutUsingInputSchema).optional(),
  connect: z.lazy(() => AppWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => AppUpdateToOneWithWhereWithoutUsingInputSchema),z.lazy(() => AppUpdateWithoutUsingInputSchema),z.lazy(() => AppUncheckedUpdateWithoutUsingInputSchema) ]).optional(),
}).strict();

export default AppUpdateOneRequiredWithoutUsingNestedInputSchema;
