import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppActionWhereUniqueInputSchema } from './AppActionWhereUniqueInputSchema';
import { AppActionUpdateWithoutUserInputSchema } from './AppActionUpdateWithoutUserInputSchema';
import { AppActionUncheckedUpdateWithoutUserInputSchema } from './AppActionUncheckedUpdateWithoutUserInputSchema';
import { AppActionCreateWithoutUserInputSchema } from './AppActionCreateWithoutUserInputSchema';
import { AppActionUncheckedCreateWithoutUserInputSchema } from './AppActionUncheckedCreateWithoutUserInputSchema';

export const AppActionUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AppActionUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => AppActionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AppActionUpdateWithoutUserInputSchema),z.lazy(() => AppActionUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => AppActionCreateWithoutUserInputSchema),z.lazy(() => AppActionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export default AppActionUpsertWithWhereUniqueWithoutUserInputSchema;
