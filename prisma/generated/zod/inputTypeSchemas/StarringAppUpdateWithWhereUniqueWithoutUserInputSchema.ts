import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StarringAppWhereUniqueInputSchema } from './StarringAppWhereUniqueInputSchema';
import { StarringAppUpdateWithoutUserInputSchema } from './StarringAppUpdateWithoutUserInputSchema';
import { StarringAppUncheckedUpdateWithoutUserInputSchema } from './StarringAppUncheckedUpdateWithoutUserInputSchema';

export const StarringAppUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.StarringAppUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => StarringAppWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => StarringAppUpdateWithoutUserInputSchema),z.lazy(() => StarringAppUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export default StarringAppUpdateWithWhereUniqueWithoutUserInputSchema;
