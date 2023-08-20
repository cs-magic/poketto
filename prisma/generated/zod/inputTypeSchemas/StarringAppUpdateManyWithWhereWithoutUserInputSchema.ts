import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StarringAppScalarWhereInputSchema } from './StarringAppScalarWhereInputSchema';
import { StarringAppUpdateManyMutationInputSchema } from './StarringAppUpdateManyMutationInputSchema';
import { StarringAppUncheckedUpdateManyWithoutUserInputSchema } from './StarringAppUncheckedUpdateManyWithoutUserInputSchema';

export const StarringAppUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.StarringAppUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => StarringAppScalarWhereInputSchema),
  data: z.union([ z.lazy(() => StarringAppUpdateManyMutationInputSchema),z.lazy(() => StarringAppUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export default StarringAppUpdateManyWithWhereWithoutUserInputSchema;
