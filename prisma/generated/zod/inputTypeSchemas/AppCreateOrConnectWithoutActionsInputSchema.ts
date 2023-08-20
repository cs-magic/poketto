import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppWhereUniqueInputSchema } from './AppWhereUniqueInputSchema';
import { AppCreateWithoutActionsInputSchema } from './AppCreateWithoutActionsInputSchema';
import { AppUncheckedCreateWithoutActionsInputSchema } from './AppUncheckedCreateWithoutActionsInputSchema';

export const AppCreateOrConnectWithoutActionsInputSchema: z.ZodType<Prisma.AppCreateOrConnectWithoutActionsInput> = z.object({
  where: z.lazy(() => AppWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AppCreateWithoutActionsInputSchema),z.lazy(() => AppUncheckedCreateWithoutActionsInputSchema) ]),
}).strict();

export default AppCreateOrConnectWithoutActionsInputSchema;
