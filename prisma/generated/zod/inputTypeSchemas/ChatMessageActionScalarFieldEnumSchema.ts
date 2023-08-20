import { z } from 'zod';

export const ChatMessageActionScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','userId','messageId','action']);

export default ChatMessageActionScalarFieldEnumSchema;
