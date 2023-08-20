import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StarringAppWhereUniqueInputSchema } from '../inputTypeSchemas/StarringAppWhereUniqueInputSchema'

export const StarringAppDeleteArgsSchema: z.ZodType<Omit<Prisma.StarringAppDeleteArgs, "select" | "include">> = z.object({
  where: StarringAppWhereUniqueInputSchema,
}).strict()

export default StarringAppDeleteArgsSchema;
