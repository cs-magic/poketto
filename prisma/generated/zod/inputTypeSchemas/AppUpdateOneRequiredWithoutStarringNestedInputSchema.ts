import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppCreateWithoutStarringInputSchema } from './AppCreateWithoutStarringInputSchema';
import { AppUncheckedCreateWithoutStarringInputSchema } from './AppUncheckedCreateWithoutStarringInputSchema';
import { AppCreateOrConnectWithoutStarringInputSchema } from './AppCreateOrConnectWithoutStarringInputSchema';
import { AppUpsertWithoutStarringInputSchema } from './AppUpsertWithoutStarringInputSchema';
import { AppWhereUniqueInputSchema } from './AppWhereUniqueInputSchema';
import { AppUpdateToOneWithWhereWithoutStarringInputSchema } from './AppUpdateToOneWithWhereWithoutStarringInputSchema';
import { AppUpdateWithoutStarringInputSchema } from './AppUpdateWithoutStarringInputSchema';
import { AppUncheckedUpdateWithoutStarringInputSchema } from './AppUncheckedUpdateWithoutStarringInputSchema';

export const AppUpdateOneRequiredWithoutStarringNestedInputSchema: z.ZodType<Prisma.AppUpdateOneRequiredWithoutStarringNestedInput> = z.object({
  create: z.union([ z.lazy(() => AppCreateWithoutStarringInputSchema),z.lazy(() => AppUncheckedCreateWithoutStarringInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AppCreateOrConnectWithoutStarringInputSchema).optional(),
  upsert: z.lazy(() => AppUpsertWithoutStarringInputSchema).optional(),
  connect: z.lazy(() => AppWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => AppUpdateToOneWithWhereWithoutStarringInputSchema),z.lazy(() => AppUpdateWithoutStarringInputSchema),z.lazy(() => AppUncheckedUpdateWithoutStarringInputSchema) ]).optional(),
}).strict();

export default AppUpdateOneRequiredWithoutStarringNestedInputSchema;
