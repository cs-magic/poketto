import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StarringAppWhereUniqueInputSchema } from './StarringAppWhereUniqueInputSchema';
import { StarringAppUpdateWithoutAppInputSchema } from './StarringAppUpdateWithoutAppInputSchema';
import { StarringAppUncheckedUpdateWithoutAppInputSchema } from './StarringAppUncheckedUpdateWithoutAppInputSchema';

export const StarringAppUpdateWithWhereUniqueWithoutAppInputSchema: z.ZodType<Prisma.StarringAppUpdateWithWhereUniqueWithoutAppInput> = z.object({
  where: z.lazy(() => StarringAppWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => StarringAppUpdateWithoutAppInputSchema),z.lazy(() => StarringAppUncheckedUpdateWithoutAppInputSchema) ]),
}).strict();

export default StarringAppUpdateWithWhereUniqueWithoutAppInputSchema;
