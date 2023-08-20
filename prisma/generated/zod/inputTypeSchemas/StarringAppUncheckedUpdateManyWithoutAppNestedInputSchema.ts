import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StarringAppCreateWithoutAppInputSchema } from './StarringAppCreateWithoutAppInputSchema';
import { StarringAppUncheckedCreateWithoutAppInputSchema } from './StarringAppUncheckedCreateWithoutAppInputSchema';
import { StarringAppCreateOrConnectWithoutAppInputSchema } from './StarringAppCreateOrConnectWithoutAppInputSchema';
import { StarringAppUpsertWithWhereUniqueWithoutAppInputSchema } from './StarringAppUpsertWithWhereUniqueWithoutAppInputSchema';
import { StarringAppCreateManyAppInputEnvelopeSchema } from './StarringAppCreateManyAppInputEnvelopeSchema';
import { StarringAppWhereUniqueInputSchema } from './StarringAppWhereUniqueInputSchema';
import { StarringAppUpdateWithWhereUniqueWithoutAppInputSchema } from './StarringAppUpdateWithWhereUniqueWithoutAppInputSchema';
import { StarringAppUpdateManyWithWhereWithoutAppInputSchema } from './StarringAppUpdateManyWithWhereWithoutAppInputSchema';
import { StarringAppScalarWhereInputSchema } from './StarringAppScalarWhereInputSchema';

export const StarringAppUncheckedUpdateManyWithoutAppNestedInputSchema: z.ZodType<Prisma.StarringAppUncheckedUpdateManyWithoutAppNestedInput> = z.object({
  create: z.union([ z.lazy(() => StarringAppCreateWithoutAppInputSchema),z.lazy(() => StarringAppCreateWithoutAppInputSchema).array(),z.lazy(() => StarringAppUncheckedCreateWithoutAppInputSchema),z.lazy(() => StarringAppUncheckedCreateWithoutAppInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => StarringAppCreateOrConnectWithoutAppInputSchema),z.lazy(() => StarringAppCreateOrConnectWithoutAppInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => StarringAppUpsertWithWhereUniqueWithoutAppInputSchema),z.lazy(() => StarringAppUpsertWithWhereUniqueWithoutAppInputSchema).array() ]).optional(),
  createMany: z.lazy(() => StarringAppCreateManyAppInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => StarringAppWhereUniqueInputSchema),z.lazy(() => StarringAppWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => StarringAppWhereUniqueInputSchema),z.lazy(() => StarringAppWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => StarringAppWhereUniqueInputSchema),z.lazy(() => StarringAppWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => StarringAppWhereUniqueInputSchema),z.lazy(() => StarringAppWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => StarringAppUpdateWithWhereUniqueWithoutAppInputSchema),z.lazy(() => StarringAppUpdateWithWhereUniqueWithoutAppInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => StarringAppUpdateManyWithWhereWithoutAppInputSchema),z.lazy(() => StarringAppUpdateManyWithWhereWithoutAppInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => StarringAppScalarWhereInputSchema),z.lazy(() => StarringAppScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default StarringAppUncheckedUpdateManyWithoutAppNestedInputSchema;
