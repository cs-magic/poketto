import { z } from 'zod';

export const AppScalarFieldEnumSchema = z.enum(['id','platformType','platformId','createdAt','updatedAt','creatorId','name','avatar','desc','language','version','categoryMain','categorySub','modelName','isOpenSource','modelArgs']);

export default AppScalarFieldEnumSchema;
