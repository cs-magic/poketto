import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StarringAppWhereUniqueInputSchema } from './StarringAppWhereUniqueInputSchema';
import { StarringAppCreateWithoutUserInputSchema } from './StarringAppCreateWithoutUserInputSchema';
import { StarringAppUncheckedCreateWithoutUserInputSchema } from './StarringAppUncheckedCreateWithoutUserInputSchema';

export const StarringAppCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.StarringAppCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => StarringAppWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => StarringAppCreateWithoutUserInputSchema),z.lazy(() => StarringAppUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export default StarringAppCreateOrConnectWithoutUserInputSchema;
