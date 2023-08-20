import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { InvitationRelationScalarWhereInputSchema } from './InvitationRelationScalarWhereInputSchema';
import { InvitationRelationUpdateManyMutationInputSchema } from './InvitationRelationUpdateManyMutationInputSchema';
import { InvitationRelationUncheckedUpdateManyWithoutFromInputSchema } from './InvitationRelationUncheckedUpdateManyWithoutFromInputSchema';

export const InvitationRelationUpdateManyWithWhereWithoutFromInputSchema: z.ZodType<Prisma.InvitationRelationUpdateManyWithWhereWithoutFromInput> = z.object({
  where: z.lazy(() => InvitationRelationScalarWhereInputSchema),
  data: z.union([ z.lazy(() => InvitationRelationUpdateManyMutationInputSchema),z.lazy(() => InvitationRelationUncheckedUpdateManyWithoutFromInputSchema) ]),
}).strict();

export default InvitationRelationUpdateManyWithWhereWithoutFromInputSchema;
