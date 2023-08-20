import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppWhereUniqueInputSchema } from './AppWhereUniqueInputSchema';
import { AppCreateWithoutStateInputSchema } from './AppCreateWithoutStateInputSchema';
import { AppUncheckedCreateWithoutStateInputSchema } from './AppUncheckedCreateWithoutStateInputSchema';

export const AppCreateOrConnectWithoutStateInputSchema: z.ZodType<Prisma.AppCreateOrConnectWithoutStateInput> = z.object({
  where: z.lazy(() => AppWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AppCreateWithoutStateInputSchema),z.lazy(() => AppUncheckedCreateWithoutStateInputSchema) ]),
}).strict();

export default AppCreateOrConnectWithoutStateInputSchema;
