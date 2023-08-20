import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppStateCreateWithoutAppInputSchema } from './AppStateCreateWithoutAppInputSchema';
import { AppStateUncheckedCreateWithoutAppInputSchema } from './AppStateUncheckedCreateWithoutAppInputSchema';
import { AppStateCreateOrConnectWithoutAppInputSchema } from './AppStateCreateOrConnectWithoutAppInputSchema';
import { AppStateWhereUniqueInputSchema } from './AppStateWhereUniqueInputSchema';

export const AppStateUncheckedCreateNestedOneWithoutAppInputSchema: z.ZodType<Prisma.AppStateUncheckedCreateNestedOneWithoutAppInput> = z.object({
  create: z.union([ z.lazy(() => AppStateCreateWithoutAppInputSchema),z.lazy(() => AppStateUncheckedCreateWithoutAppInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AppStateCreateOrConnectWithoutAppInputSchema).optional(),
  connect: z.lazy(() => AppStateWhereUniqueInputSchema).optional()
}).strict();

export default AppStateUncheckedCreateNestedOneWithoutAppInputSchema;
