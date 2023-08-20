import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserWhereInputSchema } from './UserWhereInputSchema';
import { UserUpdateWithoutAppCommentsInputSchema } from './UserUpdateWithoutAppCommentsInputSchema';
import { UserUncheckedUpdateWithoutAppCommentsInputSchema } from './UserUncheckedUpdateWithoutAppCommentsInputSchema';

export const UserUpdateToOneWithWhereWithoutAppCommentsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutAppCommentsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutAppCommentsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAppCommentsInputSchema) ]),
}).strict();

export default UserUpdateToOneWithWhereWithoutAppCommentsInputSchema;
