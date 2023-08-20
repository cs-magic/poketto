import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { FollowRelationWhereUniqueInputSchema } from './FollowRelationWhereUniqueInputSchema';
import { FollowRelationUpdateWithoutToInputSchema } from './FollowRelationUpdateWithoutToInputSchema';
import { FollowRelationUncheckedUpdateWithoutToInputSchema } from './FollowRelationUncheckedUpdateWithoutToInputSchema';
import { FollowRelationCreateWithoutToInputSchema } from './FollowRelationCreateWithoutToInputSchema';
import { FollowRelationUncheckedCreateWithoutToInputSchema } from './FollowRelationUncheckedCreateWithoutToInputSchema';

export const FollowRelationUpsertWithWhereUniqueWithoutToInputSchema: z.ZodType<Prisma.FollowRelationUpsertWithWhereUniqueWithoutToInput> = z.object({
  where: z.lazy(() => FollowRelationWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => FollowRelationUpdateWithoutToInputSchema),z.lazy(() => FollowRelationUncheckedUpdateWithoutToInputSchema) ]),
  create: z.union([ z.lazy(() => FollowRelationCreateWithoutToInputSchema),z.lazy(() => FollowRelationUncheckedCreateWithoutToInputSchema) ]),
}).strict();

export default FollowRelationUpsertWithWhereUniqueWithoutToInputSchema;
