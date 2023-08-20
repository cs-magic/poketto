import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StarringAppCreateWithoutUserInputSchema } from './StarringAppCreateWithoutUserInputSchema';
import { StarringAppUncheckedCreateWithoutUserInputSchema } from './StarringAppUncheckedCreateWithoutUserInputSchema';
import { StarringAppCreateOrConnectWithoutUserInputSchema } from './StarringAppCreateOrConnectWithoutUserInputSchema';
import { StarringAppCreateManyUserInputEnvelopeSchema } from './StarringAppCreateManyUserInputEnvelopeSchema';
import { StarringAppWhereUniqueInputSchema } from './StarringAppWhereUniqueInputSchema';

export const StarringAppUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.StarringAppUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => StarringAppCreateWithoutUserInputSchema),z.lazy(() => StarringAppCreateWithoutUserInputSchema).array(),z.lazy(() => StarringAppUncheckedCreateWithoutUserInputSchema),z.lazy(() => StarringAppUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => StarringAppCreateOrConnectWithoutUserInputSchema),z.lazy(() => StarringAppCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => StarringAppCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => StarringAppWhereUniqueInputSchema),z.lazy(() => StarringAppWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default StarringAppUncheckedCreateNestedManyWithoutUserInputSchema;
