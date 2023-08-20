import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppCategoryWhereInputSchema } from './AppCategoryWhereInputSchema';
import { AppCategoryUpdateWithoutAppInputSchema } from './AppCategoryUpdateWithoutAppInputSchema';
import { AppCategoryUncheckedUpdateWithoutAppInputSchema } from './AppCategoryUncheckedUpdateWithoutAppInputSchema';

export const AppCategoryUpdateToOneWithWhereWithoutAppInputSchema: z.ZodType<Prisma.AppCategoryUpdateToOneWithWhereWithoutAppInput> = z.object({
  where: z.lazy(() => AppCategoryWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => AppCategoryUpdateWithoutAppInputSchema),z.lazy(() => AppCategoryUncheckedUpdateWithoutAppInputSchema) ]),
}).strict();

export default AppCategoryUpdateToOneWithWhereWithoutAppInputSchema;
