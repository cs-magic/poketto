import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AppStateWhereUniqueInputSchema } from '../inputTypeSchemas/AppStateWhereUniqueInputSchema'

export const AppStateFindUniqueOrThrowArgsSchema: z.ZodType<Omit<Prisma.AppStateFindUniqueOrThrowArgs, "select" | "include">> = z.object({
  where: AppStateWhereUniqueInputSchema,
}).strict()

export default AppStateFindUniqueOrThrowArgsSchema;
