import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { InvitationRelationCreateWithoutToInputSchema } from './InvitationRelationCreateWithoutToInputSchema';
import { InvitationRelationUncheckedCreateWithoutToInputSchema } from './InvitationRelationUncheckedCreateWithoutToInputSchema';
import { InvitationRelationCreateOrConnectWithoutToInputSchema } from './InvitationRelationCreateOrConnectWithoutToInputSchema';
import { InvitationRelationCreateManyToInputEnvelopeSchema } from './InvitationRelationCreateManyToInputEnvelopeSchema';
import { InvitationRelationWhereUniqueInputSchema } from './InvitationRelationWhereUniqueInputSchema';

export const InvitationRelationUncheckedCreateNestedManyWithoutToInputSchema: z.ZodType<Prisma.InvitationRelationUncheckedCreateNestedManyWithoutToInput> = z.object({
  create: z.union([ z.lazy(() => InvitationRelationCreateWithoutToInputSchema),z.lazy(() => InvitationRelationCreateWithoutToInputSchema).array(),z.lazy(() => InvitationRelationUncheckedCreateWithoutToInputSchema),z.lazy(() => InvitationRelationUncheckedCreateWithoutToInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InvitationRelationCreateOrConnectWithoutToInputSchema),z.lazy(() => InvitationRelationCreateOrConnectWithoutToInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InvitationRelationCreateManyToInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => InvitationRelationWhereUniqueInputSchema),z.lazy(() => InvitationRelationWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default InvitationRelationUncheckedCreateNestedManyWithoutToInputSchema;
