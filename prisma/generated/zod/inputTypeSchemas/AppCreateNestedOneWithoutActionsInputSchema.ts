import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppCreateWithoutActionsInputSchema } from './AppCreateWithoutActionsInputSchema';
import { AppUncheckedCreateWithoutActionsInputSchema } from './AppUncheckedCreateWithoutActionsInputSchema';
import { AppCreateOrConnectWithoutActionsInputSchema } from './AppCreateOrConnectWithoutActionsInputSchema';
import { AppWhereUniqueInputSchema } from './AppWhereUniqueInputSchema';

export const AppCreateNestedOneWithoutActionsInputSchema: z.ZodType<Prisma.AppCreateNestedOneWithoutActionsInput> = z.object({
  create: z.union([ z.lazy(() => AppCreateWithoutActionsInputSchema),z.lazy(() => AppUncheckedCreateWithoutActionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AppCreateOrConnectWithoutActionsInputSchema).optional(),
  connect: z.lazy(() => AppWhereUniqueInputSchema).optional()
}).strict();

export default AppCreateNestedOneWithoutActionsInputSchema;
