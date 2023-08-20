import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { FollowRelationWhereUniqueInputSchema } from './FollowRelationWhereUniqueInputSchema';
import { FollowRelationUpdateWithoutFromInputSchema } from './FollowRelationUpdateWithoutFromInputSchema';
import { FollowRelationUncheckedUpdateWithoutFromInputSchema } from './FollowRelationUncheckedUpdateWithoutFromInputSchema';

export const FollowRelationUpdateWithWhereUniqueWithoutFromInputSchema: z.ZodType<Prisma.FollowRelationUpdateWithWhereUniqueWithoutFromInput> = z.object({
  where: z.lazy(() => FollowRelationWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => FollowRelationUpdateWithoutFromInputSchema),z.lazy(() => FollowRelationUncheckedUpdateWithoutFromInputSchema) ]),
}).strict();

export default FollowRelationUpdateWithWhereUniqueWithoutFromInputSchema;
