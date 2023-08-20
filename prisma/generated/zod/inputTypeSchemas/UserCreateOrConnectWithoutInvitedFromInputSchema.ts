import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserCreateWithoutInvitedFromInputSchema } from './UserCreateWithoutInvitedFromInputSchema';
import { UserUncheckedCreateWithoutInvitedFromInputSchema } from './UserUncheckedCreateWithoutInvitedFromInputSchema';

export const UserCreateOrConnectWithoutInvitedFromInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutInvitedFromInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutInvitedFromInputSchema),z.lazy(() => UserUncheckedCreateWithoutInvitedFromInputSchema) ]),
}).strict();

export default UserCreateOrConnectWithoutInvitedFromInputSchema;
