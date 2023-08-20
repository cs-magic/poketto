import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppCreateWithoutCreatorInputSchema } from './AppCreateWithoutCreatorInputSchema';
import { AppUncheckedCreateWithoutCreatorInputSchema } from './AppUncheckedCreateWithoutCreatorInputSchema';
import { AppCreateOrConnectWithoutCreatorInputSchema } from './AppCreateOrConnectWithoutCreatorInputSchema';
import { AppCreateManyCreatorInputEnvelopeSchema } from './AppCreateManyCreatorInputEnvelopeSchema';
import { AppWhereUniqueInputSchema } from './AppWhereUniqueInputSchema';

export const AppCreateNestedManyWithoutCreatorInputSchema: z.ZodType<Prisma.AppCreateNestedManyWithoutCreatorInput> = z.object({
  create: z.union([ z.lazy(() => AppCreateWithoutCreatorInputSchema),z.lazy(() => AppCreateWithoutCreatorInputSchema).array(),z.lazy(() => AppUncheckedCreateWithoutCreatorInputSchema),z.lazy(() => AppUncheckedCreateWithoutCreatorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AppCreateOrConnectWithoutCreatorInputSchema),z.lazy(() => AppCreateOrConnectWithoutCreatorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AppCreateManyCreatorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AppWhereUniqueInputSchema),z.lazy(() => AppWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default AppCreateNestedManyWithoutCreatorInputSchema;
