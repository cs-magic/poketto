import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StarringAppScalarWhereInputSchema } from './StarringAppScalarWhereInputSchema';
import { StarringAppUpdateManyMutationInputSchema } from './StarringAppUpdateManyMutationInputSchema';
import { StarringAppUncheckedUpdateManyWithoutAppInputSchema } from './StarringAppUncheckedUpdateManyWithoutAppInputSchema';

export const StarringAppUpdateManyWithWhereWithoutAppInputSchema: z.ZodType<Prisma.StarringAppUpdateManyWithWhereWithoutAppInput> = z.object({
  where: z.lazy(() => StarringAppScalarWhereInputSchema),
  data: z.union([ z.lazy(() => StarringAppUpdateManyMutationInputSchema),z.lazy(() => StarringAppUncheckedUpdateManyWithoutAppInputSchema) ]),
}).strict();

export default StarringAppUpdateManyWithWhereWithoutAppInputSchema;
