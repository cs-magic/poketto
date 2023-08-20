import type { Prisma } from '@prisma/client';
import { z } from 'zod';

export const SessionCreateManyUserInputSchema: z.ZodType<Prisma.SessionCreateManyUserInput> = z.object({
  id: z.string().optional(),
  sessionToken: z.string(),
  expires: z.date()
}).strict();

export default SessionCreateManyUserInputSchema;
