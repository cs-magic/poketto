import { z } from 'zod';

export const AppActionScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','userId','appId','action']);

export default AppActionScalarFieldEnumSchema;
