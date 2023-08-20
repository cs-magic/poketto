import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserWhereInputSchema } from './UserWhereInputSchema';
import { UserUpdateWithoutFollowingInputSchema } from './UserUpdateWithoutFollowingInputSchema';
import { UserUncheckedUpdateWithoutFollowingInputSchema } from './UserUncheckedUpdateWithoutFollowingInputSchema';

export const UserUpdateToOneWithWhereWithoutFollowingInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutFollowingInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutFollowingInputSchema),z.lazy(() => UserUncheckedUpdateWithoutFollowingInputSchema) ]),
}).strict();

export default UserUpdateToOneWithWhereWithoutFollowingInputSchema;
