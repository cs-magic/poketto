import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { FollowRelationScalarWhereInputSchema } from './FollowRelationScalarWhereInputSchema';
import { FollowRelationUpdateManyMutationInputSchema } from './FollowRelationUpdateManyMutationInputSchema';
import { FollowRelationUncheckedUpdateManyWithoutToInputSchema } from './FollowRelationUncheckedUpdateManyWithoutToInputSchema';

export const FollowRelationUpdateManyWithWhereWithoutToInputSchema: z.ZodType<Prisma.FollowRelationUpdateManyWithWhereWithoutToInput> = z.object({
  where: z.lazy(() => FollowRelationScalarWhereInputSchema),
  data: z.union([ z.lazy(() => FollowRelationUpdateManyMutationInputSchema),z.lazy(() => FollowRelationUncheckedUpdateManyWithoutToInputSchema) ]),
}).strict();

export default FollowRelationUpdateManyWithWhereWithoutToInputSchema;
