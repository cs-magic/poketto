import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppActionCreateWithoutAppInputSchema } from './AppActionCreateWithoutAppInputSchema';
import { AppActionUncheckedCreateWithoutAppInputSchema } from './AppActionUncheckedCreateWithoutAppInputSchema';
import { AppActionCreateOrConnectWithoutAppInputSchema } from './AppActionCreateOrConnectWithoutAppInputSchema';
import { AppActionCreateManyAppInputEnvelopeSchema } from './AppActionCreateManyAppInputEnvelopeSchema';
import { AppActionWhereUniqueInputSchema } from './AppActionWhereUniqueInputSchema';

export const AppActionUncheckedCreateNestedManyWithoutAppInputSchema: z.ZodType<Prisma.AppActionUncheckedCreateNestedManyWithoutAppInput> = z.object({
  create: z.union([ z.lazy(() => AppActionCreateWithoutAppInputSchema),z.lazy(() => AppActionCreateWithoutAppInputSchema).array(),z.lazy(() => AppActionUncheckedCreateWithoutAppInputSchema),z.lazy(() => AppActionUncheckedCreateWithoutAppInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AppActionCreateOrConnectWithoutAppInputSchema),z.lazy(() => AppActionCreateOrConnectWithoutAppInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AppActionCreateManyAppInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AppActionWhereUniqueInputSchema),z.lazy(() => AppActionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default AppActionUncheckedCreateNestedManyWithoutAppInputSchema;
