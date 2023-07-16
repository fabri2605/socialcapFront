import { z } from 'zod';

export const SessionScalarFieldEnumSchema = z.enum(['uid','otp','email','createdUtc','updatedUtc']);

export default SessionScalarFieldEnumSchema;
