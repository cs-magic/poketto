import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserUpdateWithoutFollowingInputSchema } from './UserUpdateWithoutFollowingInputSchema';
import { UserUncheckedUpdateWithoutFollowingInputSchema } from './UserUncheckedUpdateWithoutFollowingInputSchema';
import { UserCreateWithoutFollowingInputSchema } from './UserCreateWithoutFollowingInputSchema';
import { UserUncheckedCreateWithoutFollowingInputSchema } from './UserUncheckedCreateWithoutFollowingInputSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';

export const UserUpsertWithoutFollowingInputSchema: z.ZodType<Prisma.UserUpsertWithoutFollowingInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutFollowingInputSchema),z.lazy(() => UserUncheckedUpdateWithoutFollowingInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutFollowingInputSchema),z.lazy(() => UserUncheckedCreateWithoutFollowingInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export default UserUpsertWithoutFollowingInputSchema;
