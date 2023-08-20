import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SessionUpdateInputSchema } from '../inputTypeSchemas/SessionUpdateInputSchema'
import { SessionUncheckedUpdateInputSchema } from '../inputTypeSchemas/SessionUncheckedUpdateInputSchema'
import { SessionWhereUniqueInputSchema } from '../inputTypeSchemas/SessionWhereUniqueInputSchema'

export const SessionUpdateArgsSchema: z.ZodType<Omit<Prisma.SessionUpdateArgs, "select" | "include">> = z.object({
  data: z.union([ SessionUpdateInputSchema,SessionUncheckedUpdateInputSchema ]),
  where: SessionWhereUniqueInputSchema,
}).strict()

export default SessionUpdateArgsSchema;
