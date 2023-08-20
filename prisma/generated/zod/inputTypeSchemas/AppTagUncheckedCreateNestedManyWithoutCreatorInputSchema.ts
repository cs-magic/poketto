import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppTagCreateWithoutCreatorInputSchema } from './AppTagCreateWithoutCreatorInputSchema';
import { AppTagUncheckedCreateWithoutCreatorInputSchema } from './AppTagUncheckedCreateWithoutCreatorInputSchema';
import { AppTagCreateOrConnectWithoutCreatorInputSchema } from './AppTagCreateOrConnectWithoutCreatorInputSchema';
import { AppTagCreateManyCreatorInputEnvelopeSchema } from './AppTagCreateManyCreatorInputEnvelopeSchema';
import { AppTagWhereUniqueInputSchema } from './AppTagWhereUniqueInputSchema';

export const AppTagUncheckedCreateNestedManyWithoutCreatorInputSchema: z.ZodType<Prisma.AppTagUncheckedCreateNestedManyWithoutCreatorInput> = z.object({
  create: z.union([ z.lazy(() => AppTagCreateWithoutCreatorInputSchema),z.lazy(() => AppTagCreateWithoutCreatorInputSchema).array(),z.lazy(() => AppTagUncheckedCreateWithoutCreatorInputSchema),z.lazy(() => AppTagUncheckedCreateWithoutCreatorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AppTagCreateOrConnectWithoutCreatorInputSchema),z.lazy(() => AppTagCreateOrConnectWithoutCreatorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AppTagCreateManyCreatorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AppTagWhereUniqueInputSchema),z.lazy(() => AppTagWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default AppTagUncheckedCreateNestedManyWithoutCreatorInputSchema;
