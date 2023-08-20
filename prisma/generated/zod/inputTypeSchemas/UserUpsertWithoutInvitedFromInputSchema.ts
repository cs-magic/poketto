import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserUpdateWithoutInvitedFromInputSchema } from './UserUpdateWithoutInvitedFromInputSchema';
import { UserUncheckedUpdateWithoutInvitedFromInputSchema } from './UserUncheckedUpdateWithoutInvitedFromInputSchema';
import { UserCreateWithoutInvitedFromInputSchema } from './UserCreateWithoutInvitedFromInputSchema';
import { UserUncheckedCreateWithoutInvitedFromInputSchema } from './UserUncheckedCreateWithoutInvitedFromInputSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';

export const UserUpsertWithoutInvitedFromInputSchema: z.ZodType<Prisma.UserUpsertWithoutInvitedFromInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutInvitedFromInputSchema),z.lazy(() => UserUncheckedUpdateWithoutInvitedFromInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutInvitedFromInputSchema),z.lazy(() => UserUncheckedCreateWithoutInvitedFromInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export default UserUpsertWithoutInvitedFromInputSchema;
