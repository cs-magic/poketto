import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserCreateWithoutChatMessagesInputSchema } from './UserCreateWithoutChatMessagesInputSchema';
import { UserUncheckedCreateWithoutChatMessagesInputSchema } from './UserUncheckedCreateWithoutChatMessagesInputSchema';
import { UserCreateOrConnectWithoutChatMessagesInputSchema } from './UserCreateOrConnectWithoutChatMessagesInputSchema';
import { UserUpsertWithoutChatMessagesInputSchema } from './UserUpsertWithoutChatMessagesInputSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserUpdateToOneWithWhereWithoutChatMessagesInputSchema } from './UserUpdateToOneWithWhereWithoutChatMessagesInputSchema';
import { UserUpdateWithoutChatMessagesInputSchema } from './UserUpdateWithoutChatMessagesInputSchema';
import { UserUncheckedUpdateWithoutChatMessagesInputSchema } from './UserUncheckedUpdateWithoutChatMessagesInputSchema';

export const UserUpdateOneWithoutChatMessagesNestedInputSchema: z.ZodType<Prisma.UserUpdateOneWithoutChatMessagesNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutChatMessagesInputSchema),z.lazy(() => UserUncheckedCreateWithoutChatMessagesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutChatMessagesInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutChatMessagesInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutChatMessagesInputSchema),z.lazy(() => UserUpdateWithoutChatMessagesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutChatMessagesInputSchema) ]).optional(),
}).strict();

export default UserUpdateOneWithoutChatMessagesNestedInputSchema;
