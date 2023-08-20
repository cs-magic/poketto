import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { InvitationRelationWhereUniqueInputSchema } from './InvitationRelationWhereUniqueInputSchema';
import { InvitationRelationCreateWithoutFromInputSchema } from './InvitationRelationCreateWithoutFromInputSchema';
import { InvitationRelationUncheckedCreateWithoutFromInputSchema } from './InvitationRelationUncheckedCreateWithoutFromInputSchema';

export const InvitationRelationCreateOrConnectWithoutFromInputSchema: z.ZodType<Prisma.InvitationRelationCreateOrConnectWithoutFromInput> = z.object({
  where: z.lazy(() => InvitationRelationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => InvitationRelationCreateWithoutFromInputSchema),z.lazy(() => InvitationRelationUncheckedCreateWithoutFromInputSchema) ]),
}).strict();

export default InvitationRelationCreateOrConnectWithoutFromInputSchema;
