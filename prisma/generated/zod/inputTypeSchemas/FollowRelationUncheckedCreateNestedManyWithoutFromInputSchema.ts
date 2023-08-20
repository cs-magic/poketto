import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { FollowRelationCreateWithoutFromInputSchema } from './FollowRelationCreateWithoutFromInputSchema';
import { FollowRelationUncheckedCreateWithoutFromInputSchema } from './FollowRelationUncheckedCreateWithoutFromInputSchema';
import { FollowRelationCreateOrConnectWithoutFromInputSchema } from './FollowRelationCreateOrConnectWithoutFromInputSchema';
import { FollowRelationCreateManyFromInputEnvelopeSchema } from './FollowRelationCreateManyFromInputEnvelopeSchema';
import { FollowRelationWhereUniqueInputSchema } from './FollowRelationWhereUniqueInputSchema';

export const FollowRelationUncheckedCreateNestedManyWithoutFromInputSchema: z.ZodType<Prisma.FollowRelationUncheckedCreateNestedManyWithoutFromInput> = z.object({
  create: z.union([ z.lazy(() => FollowRelationCreateWithoutFromInputSchema),z.lazy(() => FollowRelationCreateWithoutFromInputSchema).array(),z.lazy(() => FollowRelationUncheckedCreateWithoutFromInputSchema),z.lazy(() => FollowRelationUncheckedCreateWithoutFromInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FollowRelationCreateOrConnectWithoutFromInputSchema),z.lazy(() => FollowRelationCreateOrConnectWithoutFromInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FollowRelationCreateManyFromInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FollowRelationWhereUniqueInputSchema),z.lazy(() => FollowRelationWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default FollowRelationUncheckedCreateNestedManyWithoutFromInputSchema;
