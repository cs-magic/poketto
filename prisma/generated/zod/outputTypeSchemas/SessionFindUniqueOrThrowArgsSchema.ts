import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SessionWhereUniqueInputSchema } from '../inputTypeSchemas/SessionWhereUniqueInputSchema'

export const SessionFindUniqueOrThrowArgsSchema: z.ZodType<Omit<Prisma.SessionFindUniqueOrThrowArgs, "select" | "include">> = z.object({
  where: SessionWhereUniqueInputSchema,
}).strict()

export default SessionFindUniqueOrThrowArgsSchema;
