import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppTagWhereUniqueInputSchema } from './AppTagWhereUniqueInputSchema';
import { AppTagCreateWithoutCreatorInputSchema } from './AppTagCreateWithoutCreatorInputSchema';
import { AppTagUncheckedCreateWithoutCreatorInputSchema } from './AppTagUncheckedCreateWithoutCreatorInputSchema';

export const AppTagCreateOrConnectWithoutCreatorInputSchema: z.ZodType<Prisma.AppTagCreateOrConnectWithoutCreatorInput> = z.object({
  where: z.lazy(() => AppTagWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AppTagCreateWithoutCreatorInputSchema),z.lazy(() => AppTagUncheckedCreateWithoutCreatorInputSchema) ]),
}).strict();

export default AppTagCreateOrConnectWithoutCreatorInputSchema;
