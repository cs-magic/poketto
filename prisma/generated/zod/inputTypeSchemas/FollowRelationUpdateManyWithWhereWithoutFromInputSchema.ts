import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { FollowRelationScalarWhereInputSchema } from './FollowRelationScalarWhereInputSchema';
import { FollowRelationUpdateManyMutationInputSchema } from './FollowRelationUpdateManyMutationInputSchema';
import { FollowRelationUncheckedUpdateManyWithoutFromInputSchema } from './FollowRelationUncheckedUpdateManyWithoutFromInputSchema';

export const FollowRelationUpdateManyWithWhereWithoutFromInputSchema: z.ZodType<Prisma.FollowRelationUpdateManyWithWhereWithoutFromInput> = z.object({
  where: z.lazy(() => FollowRelationScalarWhereInputSchema),
  data: z.union([ z.lazy(() => FollowRelationUpdateManyMutationInputSchema),z.lazy(() => FollowRelationUncheckedUpdateManyWithoutFromInputSchema) ]),
}).strict();

export default FollowRelationUpdateManyWithWhereWithoutFromInputSchema;
