import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserUpdateWithoutAppCommentsInputSchema } from './UserUpdateWithoutAppCommentsInputSchema';
import { UserUncheckedUpdateWithoutAppCommentsInputSchema } from './UserUncheckedUpdateWithoutAppCommentsInputSchema';
import { UserCreateWithoutAppCommentsInputSchema } from './UserCreateWithoutAppCommentsInputSchema';
import { UserUncheckedCreateWithoutAppCommentsInputSchema } from './UserUncheckedCreateWithoutAppCommentsInputSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';

export const UserUpsertWithoutAppCommentsInputSchema: z.ZodType<Prisma.UserUpsertWithoutAppCommentsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutAppCommentsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAppCommentsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutAppCommentsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAppCommentsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export default UserUpsertWithoutAppCommentsInputSchema;
