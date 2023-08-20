import { z } from 'zod';

export const UserScalarFieldEnumSchema = z.enum(['id','platformType','platformId','platformArgs','name','email','emailVerified','image','desc','balance','followedByCount','followingCount']);

export default UserScalarFieldEnumSchema;
