import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserCreateWithoutCreatedAppsInputSchema } from './UserCreateWithoutCreatedAppsInputSchema';
import { UserUncheckedCreateWithoutCreatedAppsInputSchema } from './UserUncheckedCreateWithoutCreatedAppsInputSchema';

export const UserCreateOrConnectWithoutCreatedAppsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutCreatedAppsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutCreatedAppsInputSchema),z.lazy(() => UserUncheckedCreateWithoutCreatedAppsInputSchema) ]),
}).strict();

export default UserCreateOrConnectWithoutCreatedAppsInputSchema;
