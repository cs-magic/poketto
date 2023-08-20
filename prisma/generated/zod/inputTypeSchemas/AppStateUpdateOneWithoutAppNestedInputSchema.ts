import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppStateCreateWithoutAppInputSchema } from './AppStateCreateWithoutAppInputSchema';
import { AppStateUncheckedCreateWithoutAppInputSchema } from './AppStateUncheckedCreateWithoutAppInputSchema';
import { AppStateCreateOrConnectWithoutAppInputSchema } from './AppStateCreateOrConnectWithoutAppInputSchema';
import { AppStateUpsertWithoutAppInputSchema } from './AppStateUpsertWithoutAppInputSchema';
import { AppStateWhereInputSchema } from './AppStateWhereInputSchema';
import { AppStateWhereUniqueInputSchema } from './AppStateWhereUniqueInputSchema';
import { AppStateUpdateToOneWithWhereWithoutAppInputSchema } from './AppStateUpdateToOneWithWhereWithoutAppInputSchema';
import { AppStateUpdateWithoutAppInputSchema } from './AppStateUpdateWithoutAppInputSchema';
import { AppStateUncheckedUpdateWithoutAppInputSchema } from './AppStateUncheckedUpdateWithoutAppInputSchema';

export const AppStateUpdateOneWithoutAppNestedInputSchema: z.ZodType<Prisma.AppStateUpdateOneWithoutAppNestedInput> = z.object({
  create: z.union([ z.lazy(() => AppStateCreateWithoutAppInputSchema),z.lazy(() => AppStateUncheckedCreateWithoutAppInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AppStateCreateOrConnectWithoutAppInputSchema).optional(),
  upsert: z.lazy(() => AppStateUpsertWithoutAppInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => AppStateWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => AppStateWhereInputSchema) ]).optional(),
  connect: z.lazy(() => AppStateWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => AppStateUpdateToOneWithWhereWithoutAppInputSchema),z.lazy(() => AppStateUpdateWithoutAppInputSchema),z.lazy(() => AppStateUncheckedUpdateWithoutAppInputSchema) ]).optional(),
}).strict();

export default AppStateUpdateOneWithoutAppNestedInputSchema;
