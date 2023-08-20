import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserWhereInputSchema } from './UserWhereInputSchema';
import { UserUpdateWithoutCreatedAppsInputSchema } from './UserUpdateWithoutCreatedAppsInputSchema';
import { UserUncheckedUpdateWithoutCreatedAppsInputSchema } from './UserUncheckedUpdateWithoutCreatedAppsInputSchema';

export const UserUpdateToOneWithWhereWithoutCreatedAppsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutCreatedAppsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutCreatedAppsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCreatedAppsInputSchema) ]),
}).strict();

export default UserUpdateToOneWithWhereWithoutCreatedAppsInputSchema;
