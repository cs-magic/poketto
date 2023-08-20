import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppWhereUniqueInputSchema } from './AppWhereUniqueInputSchema';
import { AppCreateWithoutCreatorInputSchema } from './AppCreateWithoutCreatorInputSchema';
import { AppUncheckedCreateWithoutCreatorInputSchema } from './AppUncheckedCreateWithoutCreatorInputSchema';

export const AppCreateOrConnectWithoutCreatorInputSchema: z.ZodType<Prisma.AppCreateOrConnectWithoutCreatorInput> = z.object({
  where: z.lazy(() => AppWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AppCreateWithoutCreatorInputSchema),z.lazy(() => AppUncheckedCreateWithoutCreatorInputSchema) ]),
}).strict();

export default AppCreateOrConnectWithoutCreatorInputSchema;
