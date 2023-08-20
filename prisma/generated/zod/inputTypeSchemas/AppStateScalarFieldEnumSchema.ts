import { z } from 'zod';

export const AppStateScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','views','stars','forks','tips','calls','shares','appId']);

export default AppStateScalarFieldEnumSchema;
