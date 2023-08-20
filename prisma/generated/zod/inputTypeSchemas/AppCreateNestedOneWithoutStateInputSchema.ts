import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppCreateWithoutStateInputSchema } from './AppCreateWithoutStateInputSchema';
import { AppUncheckedCreateWithoutStateInputSchema } from './AppUncheckedCreateWithoutStateInputSchema';
import { AppCreateOrConnectWithoutStateInputSchema } from './AppCreateOrConnectWithoutStateInputSchema';
import { AppWhereUniqueInputSchema } from './AppWhereUniqueInputSchema';

export const AppCreateNestedOneWithoutStateInputSchema: z.ZodType<Prisma.AppCreateNestedOneWithoutStateInput> = z.object({
  create: z.union([ z.lazy(() => AppCreateWithoutStateInputSchema),z.lazy(() => AppUncheckedCreateWithoutStateInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AppCreateOrConnectWithoutStateInputSchema).optional(),
  connect: z.lazy(() => AppWhereUniqueInputSchema).optional()
}).strict();

export default AppCreateNestedOneWithoutStateInputSchema;
