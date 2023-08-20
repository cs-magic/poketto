import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppActionWhereUniqueInputSchema } from './AppActionWhereUniqueInputSchema';
import { AppActionCreateWithoutUserInputSchema } from './AppActionCreateWithoutUserInputSchema';
import { AppActionUncheckedCreateWithoutUserInputSchema } from './AppActionUncheckedCreateWithoutUserInputSchema';

export const AppActionCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.AppActionCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => AppActionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AppActionCreateWithoutUserInputSchema),z.lazy(() => AppActionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export default AppActionCreateOrConnectWithoutUserInputSchema;
