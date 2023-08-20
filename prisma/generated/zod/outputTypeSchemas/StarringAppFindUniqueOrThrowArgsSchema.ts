import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StarringAppWhereUniqueInputSchema } from '../inputTypeSchemas/StarringAppWhereUniqueInputSchema'

export const StarringAppFindUniqueOrThrowArgsSchema: z.ZodType<Omit<Prisma.StarringAppFindUniqueOrThrowArgs, "select" | "include">> = z.object({
  where: StarringAppWhereUniqueInputSchema,
}).strict()

export default StarringAppFindUniqueOrThrowArgsSchema;
