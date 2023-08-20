import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserUpdateWithoutTagsInputSchema } from './UserUpdateWithoutTagsInputSchema';
import { UserUncheckedUpdateWithoutTagsInputSchema } from './UserUncheckedUpdateWithoutTagsInputSchema';
import { UserCreateWithoutTagsInputSchema } from './UserCreateWithoutTagsInputSchema';
import { UserUncheckedCreateWithoutTagsInputSchema } from './UserUncheckedCreateWithoutTagsInputSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';

export const UserUpsertWithoutTagsInputSchema: z.ZodType<Prisma.UserUpsertWithoutTagsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutTagsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutTagsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutTagsInputSchema),z.lazy(() => UserUncheckedCreateWithoutTagsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export default UserUpsertWithoutTagsInputSchema;
