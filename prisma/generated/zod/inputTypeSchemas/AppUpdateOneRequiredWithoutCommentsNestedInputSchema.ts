import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppCreateWithoutCommentsInputSchema } from './AppCreateWithoutCommentsInputSchema';
import { AppUncheckedCreateWithoutCommentsInputSchema } from './AppUncheckedCreateWithoutCommentsInputSchema';
import { AppCreateOrConnectWithoutCommentsInputSchema } from './AppCreateOrConnectWithoutCommentsInputSchema';
import { AppUpsertWithoutCommentsInputSchema } from './AppUpsertWithoutCommentsInputSchema';
import { AppWhereUniqueInputSchema } from './AppWhereUniqueInputSchema';
import { AppUpdateToOneWithWhereWithoutCommentsInputSchema } from './AppUpdateToOneWithWhereWithoutCommentsInputSchema';
import { AppUpdateWithoutCommentsInputSchema } from './AppUpdateWithoutCommentsInputSchema';
import { AppUncheckedUpdateWithoutCommentsInputSchema } from './AppUncheckedUpdateWithoutCommentsInputSchema';

export const AppUpdateOneRequiredWithoutCommentsNestedInputSchema: z.ZodType<Prisma.AppUpdateOneRequiredWithoutCommentsNestedInput> = z.object({
  create: z.union([ z.lazy(() => AppCreateWithoutCommentsInputSchema),z.lazy(() => AppUncheckedCreateWithoutCommentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AppCreateOrConnectWithoutCommentsInputSchema).optional(),
  upsert: z.lazy(() => AppUpsertWithoutCommentsInputSchema).optional(),
  connect: z.lazy(() => AppWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => AppUpdateToOneWithWhereWithoutCommentsInputSchema),z.lazy(() => AppUpdateWithoutCommentsInputSchema),z.lazy(() => AppUncheckedUpdateWithoutCommentsInputSchema) ]).optional(),
}).strict();

export default AppUpdateOneRequiredWithoutCommentsNestedInputSchema;
