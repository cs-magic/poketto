import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserUpdateWithoutFollowedByInputSchema } from './UserUpdateWithoutFollowedByInputSchema';
import { UserUncheckedUpdateWithoutFollowedByInputSchema } from './UserUncheckedUpdateWithoutFollowedByInputSchema';
import { UserCreateWithoutFollowedByInputSchema } from './UserCreateWithoutFollowedByInputSchema';
import { UserUncheckedCreateWithoutFollowedByInputSchema } from './UserUncheckedCreateWithoutFollowedByInputSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';

export const UserUpsertWithoutFollowedByInputSchema: z.ZodType<Prisma.UserUpsertWithoutFollowedByInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutFollowedByInputSchema),z.lazy(() => UserUncheckedUpdateWithoutFollowedByInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutFollowedByInputSchema),z.lazy(() => UserUncheckedCreateWithoutFollowedByInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export default UserUpsertWithoutFollowedByInputSchema;
