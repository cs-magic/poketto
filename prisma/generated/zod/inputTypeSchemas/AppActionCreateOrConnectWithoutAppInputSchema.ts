import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppActionWhereUniqueInputSchema } from './AppActionWhereUniqueInputSchema';
import { AppActionCreateWithoutAppInputSchema } from './AppActionCreateWithoutAppInputSchema';
import { AppActionUncheckedCreateWithoutAppInputSchema } from './AppActionUncheckedCreateWithoutAppInputSchema';

export const AppActionCreateOrConnectWithoutAppInputSchema: z.ZodType<Prisma.AppActionCreateOrConnectWithoutAppInput> = z.object({
  where: z.lazy(() => AppActionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AppActionCreateWithoutAppInputSchema),z.lazy(() => AppActionUncheckedCreateWithoutAppInputSchema) ]),
}).strict();

export default AppActionCreateOrConnectWithoutAppInputSchema;
