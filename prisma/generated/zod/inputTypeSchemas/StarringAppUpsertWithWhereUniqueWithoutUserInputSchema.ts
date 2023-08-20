import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StarringAppWhereUniqueInputSchema } from './StarringAppWhereUniqueInputSchema';
import { StarringAppUpdateWithoutUserInputSchema } from './StarringAppUpdateWithoutUserInputSchema';
import { StarringAppUncheckedUpdateWithoutUserInputSchema } from './StarringAppUncheckedUpdateWithoutUserInputSchema';
import { StarringAppCreateWithoutUserInputSchema } from './StarringAppCreateWithoutUserInputSchema';
import { StarringAppUncheckedCreateWithoutUserInputSchema } from './StarringAppUncheckedCreateWithoutUserInputSchema';

export const StarringAppUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.StarringAppUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => StarringAppWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => StarringAppUpdateWithoutUserInputSchema),z.lazy(() => StarringAppUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => StarringAppCreateWithoutUserInputSchema),z.lazy(() => StarringAppUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export default StarringAppUpsertWithWhereUniqueWithoutUserInputSchema;
