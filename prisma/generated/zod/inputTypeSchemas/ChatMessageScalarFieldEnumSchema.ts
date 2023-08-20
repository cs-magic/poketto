import { z } from 'zod';

export const ChatMessageScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','userId','role','content','format','conversationId']);

export default ChatMessageScalarFieldEnumSchema;
