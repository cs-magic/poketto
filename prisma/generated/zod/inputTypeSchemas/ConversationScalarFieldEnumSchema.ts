import { z } from 'zod';

export const ConversationScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','isActive','userId','appId','pinned']);

export default ConversationScalarFieldEnumSchema;
