import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserCreateWithoutAppActionsInputSchema } from './UserCreateWithoutAppActionsInputSchema';
import { UserUncheckedCreateWithoutAppActionsInputSchema } from './UserUncheckedCreateWithoutAppActionsInputSchema';
import { UserCreateOrConnectWithoutAppActionsInputSchema } from './UserCreateOrConnectWithoutAppActionsInputSchema';
import { UserUpsertWithoutAppActionsInputSchema } from './UserUpsertWithoutAppActionsInputSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserUpdateToOneWithWhereWithoutAppActionsInputSchema } from './UserUpdateToOneWithWhereWithoutAppActionsInputSchema';
import { UserUpdateWithoutAppActionsInputSchema } from './UserUpdateWithoutAppActionsInputSchema';
import { UserUncheckedUpdateWithoutAppActionsInputSchema } from './UserUncheckedUpdateWithoutAppActionsInputSchema';

export const UserUpdateOneWithoutAppActionsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneWithoutAppActionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAppActionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAppActionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAppActionsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutAppActionsInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutAppActionsInputSchema),z.lazy(() => UserUpdateWithoutAppActionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAppActionsInputSchema) ]).optional(),
}).strict();

export default UserUpdateOneWithoutAppActionsNestedInputSchema;
