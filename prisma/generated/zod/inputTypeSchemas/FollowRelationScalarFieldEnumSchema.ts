import { z } from 'zod';

export const FollowRelationScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','fromId','toId']);

export default FollowRelationScalarFieldEnumSchema;
