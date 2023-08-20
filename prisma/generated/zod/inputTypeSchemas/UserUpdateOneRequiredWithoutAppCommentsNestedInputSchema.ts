import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserCreateWithoutAppCommentsInputSchema } from './UserCreateWithoutAppCommentsInputSchema';
import { UserUncheckedCreateWithoutAppCommentsInputSchema } from './UserUncheckedCreateWithoutAppCommentsInputSchema';
import { UserCreateOrConnectWithoutAppCommentsInputSchema } from './UserCreateOrConnectWithoutAppCommentsInputSchema';
import { UserUpsertWithoutAppCommentsInputSchema } from './UserUpsertWithoutAppCommentsInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserUpdateToOneWithWhereWithoutAppCommentsInputSchema } from './UserUpdateToOneWithWhereWithoutAppCommentsInputSchema';
import { UserUpdateWithoutAppCommentsInputSchema } from './UserUpdateWithoutAppCommentsInputSchema';
import { UserUncheckedUpdateWithoutAppCommentsInputSchema } from './UserUncheckedUpdateWithoutAppCommentsInputSchema';

export const UserUpdateOneRequiredWithoutAppCommentsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutAppCommentsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAppCommentsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAppCommentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAppCommentsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutAppCommentsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutAppCommentsInputSchema),z.lazy(() => UserUpdateWithoutAppCommentsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAppCommentsInputSchema) ]).optional(),
}).strict();

export default UserUpdateOneRequiredWithoutAppCommentsNestedInputSchema;
