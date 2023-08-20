import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserUpdateWithoutInvitedToInputSchema } from './UserUpdateWithoutInvitedToInputSchema';
import { UserUncheckedUpdateWithoutInvitedToInputSchema } from './UserUncheckedUpdateWithoutInvitedToInputSchema';
import { UserCreateWithoutInvitedToInputSchema } from './UserCreateWithoutInvitedToInputSchema';
import { UserUncheckedCreateWithoutInvitedToInputSchema } from './UserUncheckedCreateWithoutInvitedToInputSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';

export const UserUpsertWithoutInvitedToInputSchema: z.ZodType<Prisma.UserUpsertWithoutInvitedToInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutInvitedToInputSchema),z.lazy(() => UserUncheckedUpdateWithoutInvitedToInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutInvitedToInputSchema),z.lazy(() => UserUncheckedCreateWithoutInvitedToInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export default UserUpsertWithoutInvitedToInputSchema;
