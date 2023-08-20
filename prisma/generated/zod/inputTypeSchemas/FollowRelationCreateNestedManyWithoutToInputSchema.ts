import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { FollowRelationCreateWithoutToInputSchema } from './FollowRelationCreateWithoutToInputSchema';
import { FollowRelationUncheckedCreateWithoutToInputSchema } from './FollowRelationUncheckedCreateWithoutToInputSchema';
import { FollowRelationCreateOrConnectWithoutToInputSchema } from './FollowRelationCreateOrConnectWithoutToInputSchema';
import { FollowRelationCreateManyToInputEnvelopeSchema } from './FollowRelationCreateManyToInputEnvelopeSchema';
import { FollowRelationWhereUniqueInputSchema } from './FollowRelationWhereUniqueInputSchema';

export const FollowRelationCreateNestedManyWithoutToInputSchema: z.ZodType<Prisma.FollowRelationCreateNestedManyWithoutToInput> = z.object({
  create: z.union([ z.lazy(() => FollowRelationCreateWithoutToInputSchema),z.lazy(() => FollowRelationCreateWithoutToInputSchema).array(),z.lazy(() => FollowRelationUncheckedCreateWithoutToInputSchema),z.lazy(() => FollowRelationUncheckedCreateWithoutToInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FollowRelationCreateOrConnectWithoutToInputSchema),z.lazy(() => FollowRelationCreateOrConnectWithoutToInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FollowRelationCreateManyToInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FollowRelationWhereUniqueInputSchema),z.lazy(() => FollowRelationWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default FollowRelationCreateNestedManyWithoutToInputSchema;
