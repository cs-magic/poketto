import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StarringAppCreateWithoutAppInputSchema } from './StarringAppCreateWithoutAppInputSchema';
import { StarringAppUncheckedCreateWithoutAppInputSchema } from './StarringAppUncheckedCreateWithoutAppInputSchema';
import { StarringAppCreateOrConnectWithoutAppInputSchema } from './StarringAppCreateOrConnectWithoutAppInputSchema';
import { StarringAppCreateManyAppInputEnvelopeSchema } from './StarringAppCreateManyAppInputEnvelopeSchema';
import { StarringAppWhereUniqueInputSchema } from './StarringAppWhereUniqueInputSchema';

export const StarringAppUncheckedCreateNestedManyWithoutAppInputSchema: z.ZodType<Prisma.StarringAppUncheckedCreateNestedManyWithoutAppInput> = z.object({
  create: z.union([ z.lazy(() => StarringAppCreateWithoutAppInputSchema),z.lazy(() => StarringAppCreateWithoutAppInputSchema).array(),z.lazy(() => StarringAppUncheckedCreateWithoutAppInputSchema),z.lazy(() => StarringAppUncheckedCreateWithoutAppInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => StarringAppCreateOrConnectWithoutAppInputSchema),z.lazy(() => StarringAppCreateOrConnectWithoutAppInputSchema).array() ]).optional(),
  createMany: z.lazy(() => StarringAppCreateManyAppInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => StarringAppWhereUniqueInputSchema),z.lazy(() => StarringAppWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default StarringAppUncheckedCreateNestedManyWithoutAppInputSchema;
