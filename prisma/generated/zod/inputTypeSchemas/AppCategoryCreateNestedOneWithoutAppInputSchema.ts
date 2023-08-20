import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppCategoryCreateWithoutAppInputSchema } from './AppCategoryCreateWithoutAppInputSchema';
import { AppCategoryUncheckedCreateWithoutAppInputSchema } from './AppCategoryUncheckedCreateWithoutAppInputSchema';
import { AppCategoryCreateOrConnectWithoutAppInputSchema } from './AppCategoryCreateOrConnectWithoutAppInputSchema';
import { AppCategoryWhereUniqueInputSchema } from './AppCategoryWhereUniqueInputSchema';

export const AppCategoryCreateNestedOneWithoutAppInputSchema: z.ZodType<Prisma.AppCategoryCreateNestedOneWithoutAppInput> = z.object({
  create: z.union([ z.lazy(() => AppCategoryCreateWithoutAppInputSchema),z.lazy(() => AppCategoryUncheckedCreateWithoutAppInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AppCategoryCreateOrConnectWithoutAppInputSchema).optional(),
  connect: z.lazy(() => AppCategoryWhereUniqueInputSchema).optional()
}).strict();

export default AppCategoryCreateNestedOneWithoutAppInputSchema;
