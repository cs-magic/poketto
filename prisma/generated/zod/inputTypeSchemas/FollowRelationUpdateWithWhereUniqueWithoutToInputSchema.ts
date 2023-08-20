import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { FollowRelationWhereUniqueInputSchema } from './FollowRelationWhereUniqueInputSchema';
import { FollowRelationUpdateWithoutToInputSchema } from './FollowRelationUpdateWithoutToInputSchema';
import { FollowRelationUncheckedUpdateWithoutToInputSchema } from './FollowRelationUncheckedUpdateWithoutToInputSchema';

export const FollowRelationUpdateWithWhereUniqueWithoutToInputSchema: z.ZodType<Prisma.FollowRelationUpdateWithWhereUniqueWithoutToInput> = z.object({
  where: z.lazy(() => FollowRelationWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => FollowRelationUpdateWithoutToInputSchema),z.lazy(() => FollowRelationUncheckedUpdateWithoutToInputSchema) ]),
}).strict();

export default FollowRelationUpdateWithWhereUniqueWithoutToInputSchema;
