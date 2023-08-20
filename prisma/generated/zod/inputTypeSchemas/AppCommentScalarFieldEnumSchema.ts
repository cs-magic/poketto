import { z } from 'zod';

export const AppCommentScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','userId','appId','title','content','rate']);

export default AppCommentScalarFieldEnumSchema;
