import { z } from 'zod';

export const PersonScalarFieldEnumSchema = z.enum(['uid','accountId','state','fullName','description','image','email','phone','telegram','preferences','createdUTC','updatedUTC','approvedUTC']);

export default PersonScalarFieldEnumSchema;
