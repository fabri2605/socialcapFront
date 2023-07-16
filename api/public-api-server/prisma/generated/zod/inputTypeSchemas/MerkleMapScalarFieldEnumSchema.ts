import { z } from 'zod';

export const MerkleMapScalarFieldEnumSchema = z.enum(['id','name','root','size','height','createdUtc','updatedUtc']);

export default MerkleMapScalarFieldEnumSchema;
