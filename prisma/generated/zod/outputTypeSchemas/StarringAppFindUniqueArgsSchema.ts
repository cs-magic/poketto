import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StarringAppWhereUniqueInputSchema } from '../inputTypeSchemas/StarringAppWhereUniqueInputSchema'

export const StarringAppFindUniqueArgsSchema: z.ZodType<Omit<Prisma.StarringAppFindUniqueArgs, "select" | "include">> = z.object({
  where: StarringAppWhereUniqueInputSchema,
}).strict()

export default StarringAppFindUniqueArgsSchema;
