import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserCreateWithoutInvitedToInputSchema } from './UserCreateWithoutInvitedToInputSchema';
import { UserUncheckedCreateWithoutInvitedToInputSchema } from './UserUncheckedCreateWithoutInvitedToInputSchema';
import { UserCreateOrConnectWithoutInvitedToInputSchema } from './UserCreateOrConnectWithoutInvitedToInputSchema';
import { UserUpsertWithoutInvitedToInputSchema } from './UserUpsertWithoutInvitedToInputSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserUpdateToOneWithWhereWithoutInvitedToInputSchema } from './UserUpdateToOneWithWhereWithoutInvitedToInputSchema';
import { UserUpdateWithoutInvitedToInputSchema } from './UserUpdateWithoutInvitedToInputSchema';
import { UserUncheckedUpdateWithoutInvitedToInputSchema } from './UserUncheckedUpdateWithoutInvitedToInputSchema';

export const UserUpdateOneWithoutInvitedToNestedInputSchema: z.ZodType<Prisma.UserUpdateOneWithoutInvitedToNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutInvitedToInputSchema),z.lazy(() => UserUncheckedCreateWithoutInvitedToInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutInvitedToInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutInvitedToInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutInvitedToInputSchema),z.lazy(() => UserUpdateWithoutInvitedToInputSchema),z.lazy(() => UserUncheckedUpdateWithoutInvitedToInputSchema) ]).optional(),
}).strict();

export default UserUpdateOneWithoutInvitedToNestedInputSchema;
