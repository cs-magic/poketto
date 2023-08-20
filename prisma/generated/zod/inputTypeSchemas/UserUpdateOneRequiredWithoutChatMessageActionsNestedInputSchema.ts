import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserCreateWithoutChatMessageActionsInputSchema } from './UserCreateWithoutChatMessageActionsInputSchema';
import { UserUncheckedCreateWithoutChatMessageActionsInputSchema } from './UserUncheckedCreateWithoutChatMessageActionsInputSchema';
import { UserCreateOrConnectWithoutChatMessageActionsInputSchema } from './UserCreateOrConnectWithoutChatMessageActionsInputSchema';
import { UserUpsertWithoutChatMessageActionsInputSchema } from './UserUpsertWithoutChatMessageActionsInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserUpdateToOneWithWhereWithoutChatMessageActionsInputSchema } from './UserUpdateToOneWithWhereWithoutChatMessageActionsInputSchema';
import { UserUpdateWithoutChatMessageActionsInputSchema } from './UserUpdateWithoutChatMessageActionsInputSchema';
import { UserUncheckedUpdateWithoutChatMessageActionsInputSchema } from './UserUncheckedUpdateWithoutChatMessageActionsInputSchema';

export const UserUpdateOneRequiredWithoutChatMessageActionsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutChatMessageActionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutChatMessageActionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutChatMessageActionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutChatMessageActionsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutChatMessageActionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutChatMessageActionsInputSchema),z.lazy(() => UserUpdateWithoutChatMessageActionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutChatMessageActionsInputSchema) ]).optional(),
}).strict();

export default UserUpdateOneRequiredWithoutChatMessageActionsNestedInputSchema;
