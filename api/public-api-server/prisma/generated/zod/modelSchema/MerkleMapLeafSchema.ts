import { z } from 'zod';

/////////////////////////////////////////
// MERKLE MAP LEAF SCHEMA
/////////////////////////////////////////

export const MerkleMapLeafSchema = z.object({
  uid: z.string().uuid(),
  mapId: z.number().int(),
  index: z.bigint(),
  key: z.string(),
  hash: z.string(),
  data: z.string(),
  createdUtc: z.coerce.date(),
  updatedUtc: z.coerce.date(),
})

export type MerkleMapLeaf = z.infer<typeof MerkleMapLeafSchema>

export default MerkleMapLeafSchema;
