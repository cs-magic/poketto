import { z } from 'zod';

export const RoleTypeSchema = z.enum(['admin','manager','normal']);

export type RoleTypeType = `${z.infer<typeof RoleTypeSchema>}`

export default RoleTypeSchema;
