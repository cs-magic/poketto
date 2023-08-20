import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserCreateWithoutCreatedAppsInputSchema } from './UserCreateWithoutCreatedAppsInputSchema';
import { UserUncheckedCreateWithoutCreatedAppsInputSchema } from './UserUncheckedCreateWithoutCreatedAppsInputSchema';
import { UserCreateOrConnectWithoutCreatedAppsInputSchema } from './UserCreateOrConnectWithoutCreatedAppsInputSchema';
import { UserUpsertWithoutCreatedAppsInputSchema } from './UserUpsertWithoutCreatedAppsInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserUpdateToOneWithWhereWithoutCreatedAppsInputSchema } from './UserUpdateToOneWithWhereWithoutCreatedAppsInputSchema';
import { UserUpdateWithoutCreatedAppsInputSchema } from './UserUpdateWithoutCreatedAppsInputSchema';
import { UserUncheckedUpdateWithoutCreatedAppsInputSchema } from './UserUncheckedUpdateWithoutCreatedAppsInputSchema';

export const UserUpdateOneRequiredWithoutCreatedAppsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutCreatedAppsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutCreatedAppsInputSchema),z.lazy(() => UserUncheckedCreateWithoutCreatedAppsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCreatedAppsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutCreatedAppsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutCreatedAppsInputSchema),z.lazy(() => UserUpdateWithoutCreatedAppsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCreatedAppsInputSchema) ]).optional(),
}).strict();

export default UserUpdateOneRequiredWithoutCreatedAppsNestedInputSchema;
