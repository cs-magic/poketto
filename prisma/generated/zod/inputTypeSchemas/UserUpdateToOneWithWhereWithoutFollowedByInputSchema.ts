import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserWhereInputSchema } from './UserWhereInputSchema';
import { UserUpdateWithoutFollowedByInputSchema } from './UserUpdateWithoutFollowedByInputSchema';
import { UserUncheckedUpdateWithoutFollowedByInputSchema } from './UserUncheckedUpdateWithoutFollowedByInputSchema';

export const UserUpdateToOneWithWhereWithoutFollowedByInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutFollowedByInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutFollowedByInputSchema),z.lazy(() => UserUncheckedUpdateWithoutFollowedByInputSchema) ]),
}).strict();

export default UserUpdateToOneWithWhereWithoutFollowedByInputSchema;
