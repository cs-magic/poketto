import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppCategoryCreateWithoutAppInputSchema } from './AppCategoryCreateWithoutAppInputSchema';
import { AppCategoryUncheckedCreateWithoutAppInputSchema } from './AppCategoryUncheckedCreateWithoutAppInputSchema';
import { AppCategoryCreateOrConnectWithoutAppInputSchema } from './AppCategoryCreateOrConnectWithoutAppInputSchema';
import { AppCategoryUpsertWithoutAppInputSchema } from './AppCategoryUpsertWithoutAppInputSchema';
import { AppCategoryWhereUniqueInputSchema } from './AppCategoryWhereUniqueInputSchema';
import { AppCategoryUpdateToOneWithWhereWithoutAppInputSchema } from './AppCategoryUpdateToOneWithWhereWithoutAppInputSchema';
import { AppCategoryUpdateWithoutAppInputSchema } from './AppCategoryUpdateWithoutAppInputSchema';
import { AppCategoryUncheckedUpdateWithoutAppInputSchema } from './AppCategoryUncheckedUpdateWithoutAppInputSchema';

export const AppCategoryUpdateOneRequiredWithoutAppNestedInputSchema: z.ZodType<Prisma.AppCategoryUpdateOneRequiredWithoutAppNestedInput> = z.object({
  create: z.union([ z.lazy(() => AppCategoryCreateWithoutAppInputSchema),z.lazy(() => AppCategoryUncheckedCreateWithoutAppInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AppCategoryCreateOrConnectWithoutAppInputSchema).optional(),
  upsert: z.lazy(() => AppCategoryUpsertWithoutAppInputSchema).optional(),
  connect: z.lazy(() => AppCategoryWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => AppCategoryUpdateToOneWithWhereWithoutAppInputSchema),z.lazy(() => AppCategoryUpdateWithoutAppInputSchema),z.lazy(() => AppCategoryUncheckedUpdateWithoutAppInputSchema) ]).optional(),
}).strict();

export default AppCategoryUpdateOneRequiredWithoutAppNestedInputSchema;
