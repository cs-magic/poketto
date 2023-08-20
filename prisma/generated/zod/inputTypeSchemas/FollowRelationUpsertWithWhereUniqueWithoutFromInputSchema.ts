import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { FollowRelationWhereUniqueInputSchema } from './FollowRelationWhereUniqueInputSchema';
import { FollowRelationUpdateWithoutFromInputSchema } from './FollowRelationUpdateWithoutFromInputSchema';
import { FollowRelationUncheckedUpdateWithoutFromInputSchema } from './FollowRelationUncheckedUpdateWithoutFromInputSchema';
import { FollowRelationCreateWithoutFromInputSchema } from './FollowRelationCreateWithoutFromInputSchema';
import { FollowRelationUncheckedCreateWithoutFromInputSchema } from './FollowRelationUncheckedCreateWithoutFromInputSchema';

export const FollowRelationUpsertWithWhereUniqueWithoutFromInputSchema: z.ZodType<Prisma.FollowRelationUpsertWithWhereUniqueWithoutFromInput> = z.object({
  where: z.lazy(() => FollowRelationWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => FollowRelationUpdateWithoutFromInputSchema),z.lazy(() => FollowRelationUncheckedUpdateWithoutFromInputSchema) ]),
  create: z.union([ z.lazy(() => FollowRelationCreateWithoutFromInputSchema),z.lazy(() => FollowRelationUncheckedCreateWithoutFromInputSchema) ]),
}).strict();

export default FollowRelationUpsertWithWhereUniqueWithoutFromInputSchema;
