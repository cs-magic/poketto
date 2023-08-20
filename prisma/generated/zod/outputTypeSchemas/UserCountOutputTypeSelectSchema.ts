import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  accounts: z.boolean().optional(),
  sessions: z.boolean().optional(),
  invitedFrom: z.boolean().optional(),
  invitedTo: z.boolean().optional(),
  followedBy: z.boolean().optional(),
  following: z.boolean().optional(),
  chatMessages: z.boolean().optional(),
  chatMessageActions: z.boolean().optional(),
  tags: z.boolean().optional(),
  appComments: z.boolean().optional(),
  appActions: z.boolean().optional(),
  StarringApp: z.boolean().optional(),
  createdApps: z.boolean().optional(),
  conversations: z.boolean().optional(),
}).strict();

export default UserCountOutputTypeSelectSchema;
