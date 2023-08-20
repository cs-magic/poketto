import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { FollowRelationWhereUniqueInputSchema } from './FollowRelationWhereUniqueInputSchema';
import { FollowRelationCreateWithoutToInputSchema } from './FollowRelationCreateWithoutToInputSchema';
import { FollowRelationUncheckedCreateWithoutToInputSchema } from './FollowRelationUncheckedCreateWithoutToInputSchema';

export const FollowRelationCreateOrConnectWithoutToInputSchema: z.ZodType<Prisma.FollowRelationCreateOrConnectWithoutToInput> = z.object({
  where: z.lazy(() => FollowRelationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FollowRelationCreateWithoutToInputSchema),z.lazy(() => FollowRelationUncheckedCreateWithoutToInputSchema) ]),
}).strict();

export default FollowRelationCreateOrConnectWithoutToInputSchema;
