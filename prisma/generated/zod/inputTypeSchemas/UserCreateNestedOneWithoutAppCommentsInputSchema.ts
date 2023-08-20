import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserCreateWithoutAppCommentsInputSchema } from './UserCreateWithoutAppCommentsInputSchema';
import { UserUncheckedCreateWithoutAppCommentsInputSchema } from './UserUncheckedCreateWithoutAppCommentsInputSchema';
import { UserCreateOrConnectWithoutAppCommentsInputSchema } from './UserCreateOrConnectWithoutAppCommentsInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';

export const UserCreateNestedOneWithoutAppCommentsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutAppCommentsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAppCommentsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAppCommentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAppCommentsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export default UserCreateNestedOneWithoutAppCommentsInputSchema;
