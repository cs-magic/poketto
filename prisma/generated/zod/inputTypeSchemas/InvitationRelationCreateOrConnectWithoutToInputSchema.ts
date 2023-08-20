import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { InvitationRelationWhereUniqueInputSchema } from './InvitationRelationWhereUniqueInputSchema';
import { InvitationRelationCreateWithoutToInputSchema } from './InvitationRelationCreateWithoutToInputSchema';
import { InvitationRelationUncheckedCreateWithoutToInputSchema } from './InvitationRelationUncheckedCreateWithoutToInputSchema';

export const InvitationRelationCreateOrConnectWithoutToInputSchema: z.ZodType<Prisma.InvitationRelationCreateOrConnectWithoutToInput> = z.object({
  where: z.lazy(() => InvitationRelationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => InvitationRelationCreateWithoutToInputSchema),z.lazy(() => InvitationRelationUncheckedCreateWithoutToInputSchema) ]),
}).strict();

export default InvitationRelationCreateOrConnectWithoutToInputSchema;
