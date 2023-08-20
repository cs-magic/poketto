import { z } from 'zod';

export const InvitationStatusSchema = z.enum(['Idle','Pending','Accepted','Expired']);

export type InvitationStatusType = `${z.infer<typeof InvitationStatusSchema>}`

export default InvitationStatusSchema;
