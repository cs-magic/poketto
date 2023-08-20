import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StarringAppWhereUniqueInputSchema } from './StarringAppWhereUniqueInputSchema';
import { StarringAppUpdateWithoutAppInputSchema } from './StarringAppUpdateWithoutAppInputSchema';
import { StarringAppUncheckedUpdateWithoutAppInputSchema } from './StarringAppUncheckedUpdateWithoutAppInputSchema';
import { StarringAppCreateWithoutAppInputSchema } from './StarringAppCreateWithoutAppInputSchema';
import { StarringAppUncheckedCreateWithoutAppInputSchema } from './StarringAppUncheckedCreateWithoutAppInputSchema';

export const StarringAppUpsertWithWhereUniqueWithoutAppInputSchema: z.ZodType<Prisma.StarringAppUpsertWithWhereUniqueWithoutAppInput> = z.object({
  where: z.lazy(() => StarringAppWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => StarringAppUpdateWithoutAppInputSchema),z.lazy(() => StarringAppUncheckedUpdateWithoutAppInputSchema) ]),
  create: z.union([ z.lazy(() => StarringAppCreateWithoutAppInputSchema),z.lazy(() => StarringAppUncheckedCreateWithoutAppInputSchema) ]),
}).strict();

export default StarringAppUpsertWithWhereUniqueWithoutAppInputSchema;
