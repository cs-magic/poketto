import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserCreateWithoutInvitedFromInputSchema } from './UserCreateWithoutInvitedFromInputSchema';
import { UserUncheckedCreateWithoutInvitedFromInputSchema } from './UserUncheckedCreateWithoutInvitedFromInputSchema';
import { UserCreateOrConnectWithoutInvitedFromInputSchema } from './UserCreateOrConnectWithoutInvitedFromInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';

export const UserCreateNestedOneWithoutInvitedFromInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutInvitedFromInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutInvitedFromInputSchema),z.lazy(() => UserUncheckedCreateWithoutInvitedFromInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutInvitedFromInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export default UserCreateNestedOneWithoutInvitedFromInputSchema;
