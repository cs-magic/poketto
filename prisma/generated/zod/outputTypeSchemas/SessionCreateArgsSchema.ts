import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SessionCreateInputSchema } from '../inputTypeSchemas/SessionCreateInputSchema'
import { SessionUncheckedCreateInputSchema } from '../inputTypeSchemas/SessionUncheckedCreateInputSchema'

export const SessionCreateArgsSchema: z.ZodType<Omit<Prisma.SessionCreateArgs, "select" | "include">> = z.object({
  data: z.union([ SessionCreateInputSchema,SessionUncheckedCreateInputSchema ]),
}).strict()

export default SessionCreateArgsSchema;
