import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppWhereUniqueInputSchema } from './AppWhereUniqueInputSchema';
import { AppCreateWithoutCategoryInputSchema } from './AppCreateWithoutCategoryInputSchema';
import { AppUncheckedCreateWithoutCategoryInputSchema } from './AppUncheckedCreateWithoutCategoryInputSchema';

export const AppCreateOrConnectWithoutCategoryInputSchema: z.ZodType<Prisma.AppCreateOrConnectWithoutCategoryInput> = z.object({
  where: z.lazy(() => AppWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AppCreateWithoutCategoryInputSchema),z.lazy(() => AppUncheckedCreateWithoutCategoryInputSchema) ]),
}).strict();

export default AppCreateOrConnectWithoutCategoryInputSchema;
