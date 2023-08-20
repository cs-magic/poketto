import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppWhereUniqueInputSchema } from './AppWhereUniqueInputSchema';
import { AppCreateWithoutStarringInputSchema } from './AppCreateWithoutStarringInputSchema';
import { AppUncheckedCreateWithoutStarringInputSchema } from './AppUncheckedCreateWithoutStarringInputSchema';

export const AppCreateOrConnectWithoutStarringInputSchema: z.ZodType<Prisma.AppCreateOrConnectWithoutStarringInput> = z.object({
  where: z.lazy(() => AppWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AppCreateWithoutStarringInputSchema),z.lazy(() => AppUncheckedCreateWithoutStarringInputSchema) ]),
}).strict();

export default AppCreateOrConnectWithoutStarringInputSchema;
