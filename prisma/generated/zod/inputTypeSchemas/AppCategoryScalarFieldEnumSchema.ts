import { z } from 'zod';

export const AppCategoryScalarFieldEnumSchema = z.enum(['createdAt','updatedAt','main','sub']);

export default AppCategoryScalarFieldEnumSchema;
