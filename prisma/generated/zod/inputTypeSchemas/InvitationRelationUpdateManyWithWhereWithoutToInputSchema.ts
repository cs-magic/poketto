import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { InvitationRelationScalarWhereInputSchema } from './InvitationRelationScalarWhereInputSchema';
import { InvitationRelationUpdateManyMutationInputSchema } from './InvitationRelationUpdateManyMutationInputSchema';
import { InvitationRelationUncheckedUpdateManyWithoutToInputSchema } from './InvitationRelationUncheckedUpdateManyWithoutToInputSchema';

export const InvitationRelationUpdateManyWithWhereWithoutToInputSchema: z.ZodType<Prisma.InvitationRelationUpdateManyWithWhereWithoutToInput> = z.object({
  where: z.lazy(() => InvitationRelationScalarWhereInputSchema),
  data: z.union([ z.lazy(() => InvitationRelationUpdateManyMutationInputSchema),z.lazy(() => InvitationRelationUncheckedUpdateManyWithoutToInputSchema) ]),
}).strict();

export default InvitationRelationUpdateManyWithWhereWithoutToInputSchema;
