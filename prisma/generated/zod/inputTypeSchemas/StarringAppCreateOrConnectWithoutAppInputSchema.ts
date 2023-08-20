import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StarringAppWhereUniqueInputSchema } from './StarringAppWhereUniqueInputSchema';
import { StarringAppCreateWithoutAppInputSchema } from './StarringAppCreateWithoutAppInputSchema';
import { StarringAppUncheckedCreateWithoutAppInputSchema } from './StarringAppUncheckedCreateWithoutAppInputSchema';

export const StarringAppCreateOrConnectWithoutAppInputSchema: z.ZodType<Prisma.StarringAppCreateOrConnectWithoutAppInput> = z.object({
  where: z.lazy(() => StarringAppWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => StarringAppCreateWithoutAppInputSchema),z.lazy(() => StarringAppUncheckedCreateWithoutAppInputSchema) ]),
}).strict();

export default StarringAppCreateOrConnectWithoutAppInputSchema;
