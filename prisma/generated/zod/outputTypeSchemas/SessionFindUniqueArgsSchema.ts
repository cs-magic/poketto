import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SessionWhereUniqueInputSchema } from '../inputTypeSchemas/SessionWhereUniqueInputSchema'

export const SessionFindUniqueArgsSchema: z.ZodType<Omit<Prisma.SessionFindUniqueArgs, "select" | "include">> = z.object({
  where: SessionWhereUniqueInputSchema,
}).strict()

export default SessionFindUniqueArgsSchema;
