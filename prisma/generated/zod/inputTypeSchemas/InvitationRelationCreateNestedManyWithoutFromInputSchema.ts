import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { InvitationRelationCreateWithoutFromInputSchema } from './InvitationRelationCreateWithoutFromInputSchema';
import { InvitationRelationUncheckedCreateWithoutFromInputSchema } from './InvitationRelationUncheckedCreateWithoutFromInputSchema';
import { InvitationRelationCreateOrConnectWithoutFromInputSchema } from './InvitationRelationCreateOrConnectWithoutFromInputSchema';
import { InvitationRelationCreateManyFromInputEnvelopeSchema } from './InvitationRelationCreateManyFromInputEnvelopeSchema';
import { InvitationRelationWhereUniqueInputSchema } from './InvitationRelationWhereUniqueInputSchema';

export const InvitationRelationCreateNestedManyWithoutFromInputSchema: z.ZodType<Prisma.InvitationRelationCreateNestedManyWithoutFromInput> = z.object({
  create: z.union([ z.lazy(() => InvitationRelationCreateWithoutFromInputSchema),z.lazy(() => InvitationRelationCreateWithoutFromInputSchema).array(),z.lazy(() => InvitationRelationUncheckedCreateWithoutFromInputSchema),z.lazy(() => InvitationRelationUncheckedCreateWithoutFromInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InvitationRelationCreateOrConnectWithoutFromInputSchema),z.lazy(() => InvitationRelationCreateOrConnectWithoutFromInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InvitationRelationCreateManyFromInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => InvitationRelationWhereUniqueInputSchema),z.lazy(() => InvitationRelationWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default InvitationRelationCreateNestedManyWithoutFromInputSchema;
