import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserUpdateWithoutCreatedAppsInputSchema } from './UserUpdateWithoutCreatedAppsInputSchema';
import { UserUncheckedUpdateWithoutCreatedAppsInputSchema } from './UserUncheckedUpdateWithoutCreatedAppsInputSchema';
import { UserCreateWithoutCreatedAppsInputSchema } from './UserCreateWithoutCreatedAppsInputSchema';
import { UserUncheckedCreateWithoutCreatedAppsInputSchema } from './UserUncheckedCreateWithoutCreatedAppsInputSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';

export const UserUpsertWithoutCreatedAppsInputSchema: z.ZodType<Prisma.UserUpsertWithoutCreatedAppsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutCreatedAppsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCreatedAppsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutCreatedAppsInputSchema),z.lazy(() => UserUncheckedCreateWithoutCreatedAppsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export default UserUpsertWithoutCreatedAppsInputSchema;
