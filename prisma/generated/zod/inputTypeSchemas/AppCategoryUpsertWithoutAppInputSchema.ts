import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppCategoryUpdateWithoutAppInputSchema } from './AppCategoryUpdateWithoutAppInputSchema';
import { AppCategoryUncheckedUpdateWithoutAppInputSchema } from './AppCategoryUncheckedUpdateWithoutAppInputSchema';
import { AppCategoryCreateWithoutAppInputSchema } from './AppCategoryCreateWithoutAppInputSchema';
import { AppCategoryUncheckedCreateWithoutAppInputSchema } from './AppCategoryUncheckedCreateWithoutAppInputSchema';
import { AppCategoryWhereInputSchema } from './AppCategoryWhereInputSchema';

export const AppCategoryUpsertWithoutAppInputSchema: z.ZodType<Prisma.AppCategoryUpsertWithoutAppInput> = z.object({
  update: z.union([ z.lazy(() => AppCategoryUpdateWithoutAppInputSchema),z.lazy(() => AppCategoryUncheckedUpdateWithoutAppInputSchema) ]),
  create: z.union([ z.lazy(() => AppCategoryCreateWithoutAppInputSchema),z.lazy(() => AppCategoryUncheckedCreateWithoutAppInputSchema) ]),
  where: z.lazy(() => AppCategoryWhereInputSchema).optional()
}).strict();

export default AppCategoryUpsertWithoutAppInputSchema;
