import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppCreateWithoutUsingInputSchema } from './AppCreateWithoutUsingInputSchema';
import { AppUncheckedCreateWithoutUsingInputSchema } from './AppUncheckedCreateWithoutUsingInputSchema';
import { AppCreateOrConnectWithoutUsingInputSchema } from './AppCreateOrConnectWithoutUsingInputSchema';
import { AppWhereUniqueInputSchema } from './AppWhereUniqueInputSchema';

export const AppCreateNestedOneWithoutUsingInputSchema: z.ZodType<Prisma.AppCreateNestedOneWithoutUsingInput> = z.object({
  create: z.union([ z.lazy(() => AppCreateWithoutUsingInputSchema),z.lazy(() => AppUncheckedCreateWithoutUsingInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AppCreateOrConnectWithoutUsingInputSchema).optional(),
  connect: z.lazy(() => AppWhereUniqueInputSchema).optional()
}).strict();

export default AppCreateNestedOneWithoutUsingInputSchema;
