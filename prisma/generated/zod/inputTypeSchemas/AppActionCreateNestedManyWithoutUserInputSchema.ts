import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppActionCreateWithoutUserInputSchema } from './AppActionCreateWithoutUserInputSchema';
import { AppActionUncheckedCreateWithoutUserInputSchema } from './AppActionUncheckedCreateWithoutUserInputSchema';
import { AppActionCreateOrConnectWithoutUserInputSchema } from './AppActionCreateOrConnectWithoutUserInputSchema';
import { AppActionCreateManyUserInputEnvelopeSchema } from './AppActionCreateManyUserInputEnvelopeSchema';
import { AppActionWhereUniqueInputSchema } from './AppActionWhereUniqueInputSchema';

export const AppActionCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AppActionCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => AppActionCreateWithoutUserInputSchema),z.lazy(() => AppActionCreateWithoutUserInputSchema).array(),z.lazy(() => AppActionUncheckedCreateWithoutUserInputSchema),z.lazy(() => AppActionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AppActionCreateOrConnectWithoutUserInputSchema),z.lazy(() => AppActionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AppActionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AppActionWhereUniqueInputSchema),z.lazy(() => AppActionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default AppActionCreateNestedManyWithoutUserInputSchema;
