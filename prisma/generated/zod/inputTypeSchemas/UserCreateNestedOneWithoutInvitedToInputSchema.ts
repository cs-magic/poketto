import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserCreateWithoutInvitedToInputSchema } from './UserCreateWithoutInvitedToInputSchema';
import { UserUncheckedCreateWithoutInvitedToInputSchema } from './UserUncheckedCreateWithoutInvitedToInputSchema';
import { UserCreateOrConnectWithoutInvitedToInputSchema } from './UserCreateOrConnectWithoutInvitedToInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';

export const UserCreateNestedOneWithoutInvitedToInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutInvitedToInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutInvitedToInputSchema),z.lazy(() => UserUncheckedCreateWithoutInvitedToInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutInvitedToInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export default UserCreateNestedOneWithoutInvitedToInputSchema;
