import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserCreateWithoutInvitedToInputSchema } from './UserCreateWithoutInvitedToInputSchema';
import { UserUncheckedCreateWithoutInvitedToInputSchema } from './UserUncheckedCreateWithoutInvitedToInputSchema';

export const UserCreateOrConnectWithoutInvitedToInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutInvitedToInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutInvitedToInputSchema),z.lazy(() => UserUncheckedCreateWithoutInvitedToInputSchema) ]),
}).strict();

export default UserCreateOrConnectWithoutInvitedToInputSchema;
