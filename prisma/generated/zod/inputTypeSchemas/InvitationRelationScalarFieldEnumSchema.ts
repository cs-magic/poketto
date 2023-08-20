import { z } from 'zod';

export const InvitationRelationScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','status','fromId','toId']);

export default InvitationRelationScalarFieldEnumSchema;
