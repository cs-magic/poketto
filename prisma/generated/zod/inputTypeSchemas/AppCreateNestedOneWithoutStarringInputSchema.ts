import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppCreateWithoutStarringInputSchema } from './AppCreateWithoutStarringInputSchema';
import { AppUncheckedCreateWithoutStarringInputSchema } from './AppUncheckedCreateWithoutStarringInputSchema';
import { AppCreateOrConnectWithoutStarringInputSchema } from './AppCreateOrConnectWithoutStarringInputSchema';
import { AppWhereUniqueInputSchema } from './AppWhereUniqueInputSchema';

export const AppCreateNestedOneWithoutStarringInputSchema: z.ZodType<Prisma.AppCreateNestedOneWithoutStarringInput> = z.object({
  create: z.union([ z.lazy(() => AppCreateWithoutStarringInputSchema),z.lazy(() => AppUncheckedCreateWithoutStarringInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AppCreateOrConnectWithoutStarringInputSchema).optional(),
  connect: z.lazy(() => AppWhereUniqueInputSchema).optional()
}).strict();

export default AppCreateNestedOneWithoutStarringInputSchema;
