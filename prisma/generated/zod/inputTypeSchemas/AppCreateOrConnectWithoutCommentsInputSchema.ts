import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppWhereUniqueInputSchema } from './AppWhereUniqueInputSchema';
import { AppCreateWithoutCommentsInputSchema } from './AppCreateWithoutCommentsInputSchema';
import { AppUncheckedCreateWithoutCommentsInputSchema } from './AppUncheckedCreateWithoutCommentsInputSchema';

export const AppCreateOrConnectWithoutCommentsInputSchema: z.ZodType<Prisma.AppCreateOrConnectWithoutCommentsInput> = z.object({
  where: z.lazy(() => AppWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AppCreateWithoutCommentsInputSchema),z.lazy(() => AppUncheckedCreateWithoutCommentsInputSchema) ]),
}).strict();

export default AppCreateOrConnectWithoutCommentsInputSchema;
