import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StarringAppCreateWithoutUserInputSchema } from './StarringAppCreateWithoutUserInputSchema';
import { StarringAppUncheckedCreateWithoutUserInputSchema } from './StarringAppUncheckedCreateWithoutUserInputSchema';
import { StarringAppCreateOrConnectWithoutUserInputSchema } from './StarringAppCreateOrConnectWithoutUserInputSchema';
import { StarringAppUpsertWithWhereUniqueWithoutUserInputSchema } from './StarringAppUpsertWithWhereUniqueWithoutUserInputSchema';
import { StarringAppCreateManyUserInputEnvelopeSchema } from './StarringAppCreateManyUserInputEnvelopeSchema';
import { StarringAppWhereUniqueInputSchema } from './StarringAppWhereUniqueInputSchema';
import { StarringAppUpdateWithWhereUniqueWithoutUserInputSchema } from './StarringAppUpdateWithWhereUniqueWithoutUserInputSchema';
import { StarringAppUpdateManyWithWhereWithoutUserInputSchema } from './StarringAppUpdateManyWithWhereWithoutUserInputSchema';
import { StarringAppScalarWhereInputSchema } from './StarringAppScalarWhereInputSchema';

export const StarringAppUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.StarringAppUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => StarringAppCreateWithoutUserInputSchema),z.lazy(() => StarringAppCreateWithoutUserInputSchema).array(),z.lazy(() => StarringAppUncheckedCreateWithoutUserInputSchema),z.lazy(() => StarringAppUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => StarringAppCreateOrConnectWithoutUserInputSchema),z.lazy(() => StarringAppCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => StarringAppUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => StarringAppUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => StarringAppCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => StarringAppWhereUniqueInputSchema),z.lazy(() => StarringAppWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => StarringAppWhereUniqueInputSchema),z.lazy(() => StarringAppWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => StarringAppWhereUniqueInputSchema),z.lazy(() => StarringAppWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => StarringAppWhereUniqueInputSchema),z.lazy(() => StarringAppWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => StarringAppUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => StarringAppUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => StarringAppUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => StarringAppUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => StarringAppScalarWhereInputSchema),z.lazy(() => StarringAppScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default StarringAppUpdateManyWithoutUserNestedInputSchema;
