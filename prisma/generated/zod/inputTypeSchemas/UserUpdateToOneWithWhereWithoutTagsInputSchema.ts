import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserWhereInputSchema } from './UserWhereInputSchema';
import { UserUpdateWithoutTagsInputSchema } from './UserUpdateWithoutTagsInputSchema';
import { UserUncheckedUpdateWithoutTagsInputSchema } from './UserUncheckedUpdateWithoutTagsInputSchema';

export const UserUpdateToOneWithWhereWithoutTagsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutTagsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutTagsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutTagsInputSchema) ]),
}).strict();

export default UserUpdateToOneWithWhereWithoutTagsInputSchema;
