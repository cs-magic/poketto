import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserWhereInputSchema } from './UserWhereInputSchema';
import { UserUpdateWithoutStarringAppInputSchema } from './UserUpdateWithoutStarringAppInputSchema';
import { UserUncheckedUpdateWithoutStarringAppInputSchema } from './UserUncheckedUpdateWithoutStarringAppInputSchema';

export const UserUpdateToOneWithWhereWithoutStarringAppInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutStarringAppInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutStarringAppInputSchema),z.lazy(() => UserUncheckedUpdateWithoutStarringAppInputSchema) ]),
}).strict();

export default UserUpdateToOneWithWhereWithoutStarringAppInputSchema;
