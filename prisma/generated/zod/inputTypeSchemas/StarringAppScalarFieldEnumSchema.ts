import { z } from 'zod';

export const StarringAppScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','appId','isActive','userId']);

export default StarringAppScalarFieldEnumSchema;
