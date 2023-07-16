import { z } from 'zod';

/////////////////////////////////////////
// MERKLE MAP SCHEMA
/////////////////////////////////////////

export const MerkleMapSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  root: z.bigint(),
  size: z.number().int(),
  height: z.number().int(),
  createdUtc: z.coerce.date(),
  updatedUtc: z.coerce.date(),
})

export type MerkleMap = z.infer<typeof MerkleMapSchema>

export default MerkleMapSchema;
