import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { FollowRelationWhereUniqueInputSchema } from './FollowRelationWhereUniqueInputSchema';
import { FollowRelationCreateWithoutFromInputSchema } from './FollowRelationCreateWithoutFromInputSchema';
import { FollowRelationUncheckedCreateWithoutFromInputSchema } from './FollowRelationUncheckedCreateWithoutFromInputSchema';

export const FollowRelationCreateOrConnectWithoutFromInputSchema: z.ZodType<Prisma.FollowRelationCreateOrConnectWithoutFromInput> = z.object({
  where: z.lazy(() => FollowRelationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FollowRelationCreateWithoutFromInputSchema),z.lazy(() => FollowRelationUncheckedCreateWithoutFromInputSchema) ]),
}).strict();

export default FollowRelationCreateOrConnectWithoutFromInputSchema;
