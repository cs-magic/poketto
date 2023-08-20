import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppCategoryWhereUniqueInputSchema } from './AppCategoryWhereUniqueInputSchema';
import { AppCategoryCreateWithoutAppInputSchema } from './AppCategoryCreateWithoutAppInputSchema';
import { AppCategoryUncheckedCreateWithoutAppInputSchema } from './AppCategoryUncheckedCreateWithoutAppInputSchema';

export const AppCategoryCreateOrConnectWithoutAppInputSchema: z.ZodType<Prisma.AppCategoryCreateOrConnectWithoutAppInput> = z.object({
  where: z.lazy(() => AppCategoryWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AppCategoryCreateWithoutAppInputSchema),z.lazy(() => AppCategoryUncheckedCreateWithoutAppInputSchema) ]),
}).strict();

export default AppCategoryCreateOrConnectWithoutAppInputSchema;
