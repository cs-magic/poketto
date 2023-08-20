import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserCreateWithoutAppCommentsInputSchema } from './UserCreateWithoutAppCommentsInputSchema';
import { UserUncheckedCreateWithoutAppCommentsInputSchema } from './UserUncheckedCreateWithoutAppCommentsInputSchema';

export const UserCreateOrConnectWithoutAppCommentsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutAppCommentsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutAppCommentsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAppCommentsInputSchema) ]),
}).strict();

export default UserCreateOrConnectWithoutAppCommentsInputSchema;
