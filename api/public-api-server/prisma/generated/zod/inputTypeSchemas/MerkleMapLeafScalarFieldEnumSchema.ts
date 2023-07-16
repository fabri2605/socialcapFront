import { z } from 'zod';

export const MerkleMapLeafScalarFieldEnumSchema = z.enum(['uid','mapId','index','key','hash','data','createdUtc','updatedUtc']);

export default MerkleMapLeafScalarFieldEnumSchema;
