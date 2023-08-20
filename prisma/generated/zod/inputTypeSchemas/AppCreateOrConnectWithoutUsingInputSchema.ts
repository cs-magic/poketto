import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppWhereUniqueInputSchema } from './AppWhereUniqueInputSchema';
import { AppCreateWithoutUsingInputSchema } from './AppCreateWithoutUsingInputSchema';
import { AppUncheckedCreateWithoutUsingInputSchema } from './AppUncheckedCreateWithoutUsingInputSchema';

export const AppCreateOrConnectWithoutUsingInputSchema: z.ZodType<Prisma.AppCreateOrConnectWithoutUsingInput> = z.object({
  where: z.lazy(() => AppWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AppCreateWithoutUsingInputSchema),z.lazy(() => AppUncheckedCreateWithoutUsingInputSchema) ]),
}).strict();

export default AppCreateOrConnectWithoutUsingInputSchema;
