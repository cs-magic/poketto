import { z } from 'zod';

export const AppTagScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','creatorId','name']);

export default AppTagScalarFieldEnumSchema;
