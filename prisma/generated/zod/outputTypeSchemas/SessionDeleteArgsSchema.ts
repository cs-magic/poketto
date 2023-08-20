import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SessionWhereUniqueInputSchema } from '../inputTypeSchemas/SessionWhereUniqueInputSchema'

export const SessionDeleteArgsSchema: z.ZodType<Omit<Prisma.SessionDeleteArgs, "select" | "include">> = z.object({
  where: SessionWhereUniqueInputSchema,
}).strict()

export default SessionDeleteArgsSchema;
