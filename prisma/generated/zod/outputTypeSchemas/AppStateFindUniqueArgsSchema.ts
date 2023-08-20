import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AppStateWhereUniqueInputSchema } from '../inputTypeSchemas/AppStateWhereUniqueInputSchema'

export const AppStateFindUniqueArgsSchema: z.ZodType<Omit<Prisma.AppStateFindUniqueArgs, "select" | "include">> = z.object({
  where: AppStateWhereUniqueInputSchema,
}).strict()

export default AppStateFindUniqueArgsSchema;
