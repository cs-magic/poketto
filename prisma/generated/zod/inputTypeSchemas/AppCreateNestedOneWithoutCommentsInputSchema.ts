import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppCreateWithoutCommentsInputSchema } from './AppCreateWithoutCommentsInputSchema';
import { AppUncheckedCreateWithoutCommentsInputSchema } from './AppUncheckedCreateWithoutCommentsInputSchema';
import { AppCreateOrConnectWithoutCommentsInputSchema } from './AppCreateOrConnectWithoutCommentsInputSchema';
import { AppWhereUniqueInputSchema } from './AppWhereUniqueInputSchema';

export const AppCreateNestedOneWithoutCommentsInputSchema: z.ZodType<Prisma.AppCreateNestedOneWithoutCommentsInput> = z.object({
  create: z.union([ z.lazy(() => AppCreateWithoutCommentsInputSchema),z.lazy(() => AppUncheckedCreateWithoutCommentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AppCreateOrConnectWithoutCommentsInputSchema).optional(),
  connect: z.lazy(() => AppWhereUniqueInputSchema).optional()
}).strict();

export default AppCreateNestedOneWithoutCommentsInputSchema;
