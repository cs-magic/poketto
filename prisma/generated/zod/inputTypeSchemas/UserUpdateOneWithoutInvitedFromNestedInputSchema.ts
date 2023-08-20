import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserCreateWithoutInvitedFromInputSchema } from './UserCreateWithoutInvitedFromInputSchema';
import { UserUncheckedCreateWithoutInvitedFromInputSchema } from './UserUncheckedCreateWithoutInvitedFromInputSchema';
import { UserCreateOrConnectWithoutInvitedFromInputSchema } from './UserCreateOrConnectWithoutInvitedFromInputSchema';
import { UserUpsertWithoutInvitedFromInputSchema } from './UserUpsertWithoutInvitedFromInputSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserUpdateToOneWithWhereWithoutInvitedFromInputSchema } from './UserUpdateToOneWithWhereWithoutInvitedFromInputSchema';
import { UserUpdateWithoutInvitedFromInputSchema } from './UserUpdateWithoutInvitedFromInputSchema';
import { UserUncheckedUpdateWithoutInvitedFromInputSchema } from './UserUncheckedUpdateWithoutInvitedFromInputSchema';

export const UserUpdateOneWithoutInvitedFromNestedInputSchema: z.ZodType<Prisma.UserUpdateOneWithoutInvitedFromNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutInvitedFromInputSchema),z.lazy(() => UserUncheckedCreateWithoutInvitedFromInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutInvitedFromInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutInvitedFromInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutInvitedFromInputSchema),z.lazy(() => UserUpdateWithoutInvitedFromInputSchema),z.lazy(() => UserUncheckedUpdateWithoutInvitedFromInputSchema) ]).optional(),
}).strict();

export default UserUpdateOneWithoutInvitedFromNestedInputSchema;
