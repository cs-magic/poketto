import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { FollowRelationCreateWithoutFromInputSchema } from './FollowRelationCreateWithoutFromInputSchema';
import { FollowRelationUncheckedCreateWithoutFromInputSchema } from './FollowRelationUncheckedCreateWithoutFromInputSchema';
import { FollowRelationCreateOrConnectWithoutFromInputSchema } from './FollowRelationCreateOrConnectWithoutFromInputSchema';
import { FollowRelationUpsertWithWhereUniqueWithoutFromInputSchema } from './FollowRelationUpsertWithWhereUniqueWithoutFromInputSchema';
import { FollowRelationCreateManyFromInputEnvelopeSchema } from './FollowRelationCreateManyFromInputEnvelopeSchema';
import { FollowRelationWhereUniqueInputSchema } from './FollowRelationWhereUniqueInputSchema';
import { FollowRelationUpdateWithWhereUniqueWithoutFromInputSchema } from './FollowRelationUpdateWithWhereUniqueWithoutFromInputSchema';
import { FollowRelationUpdateManyWithWhereWithoutFromInputSchema } from './FollowRelationUpdateManyWithWhereWithoutFromInputSchema';
import { FollowRelationScalarWhereInputSchema } from './FollowRelationScalarWhereInputSchema';

export const FollowRelationUpdateManyWithoutFromNestedInputSchema: z.ZodType<Prisma.FollowRelationUpdateManyWithoutFromNestedInput> = z.object({
  create: z.union([ z.lazy(() => FollowRelationCreateWithoutFromInputSchema),z.lazy(() => FollowRelationCreateWithoutFromInputSchema).array(),z.lazy(() => FollowRelationUncheckedCreateWithoutFromInputSchema),z.lazy(() => FollowRelationUncheckedCreateWithoutFromInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FollowRelationCreateOrConnectWithoutFromInputSchema),z.lazy(() => FollowRelationCreateOrConnectWithoutFromInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FollowRelationUpsertWithWhereUniqueWithoutFromInputSchema),z.lazy(() => FollowRelationUpsertWithWhereUniqueWithoutFromInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FollowRelationCreateManyFromInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FollowRelationWhereUniqueInputSchema),z.lazy(() => FollowRelationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FollowRelationWhereUniqueInputSchema),z.lazy(() => FollowRelationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FollowRelationWhereUniqueInputSchema),z.lazy(() => FollowRelationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FollowRelationWhereUniqueInputSchema),z.lazy(() => FollowRelationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FollowRelationUpdateWithWhereUniqueWithoutFromInputSchema),z.lazy(() => FollowRelationUpdateWithWhereUniqueWithoutFromInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FollowRelationUpdateManyWithWhereWithoutFromInputSchema),z.lazy(() => FollowRelationUpdateManyWithWhereWithoutFromInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FollowRelationScalarWhereInputSchema),z.lazy(() => FollowRelationScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default FollowRelationUpdateManyWithoutFromNestedInputSchema;
