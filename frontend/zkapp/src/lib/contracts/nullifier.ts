/**
 * Builds the Nullifier from the set of received Leafs
 * We need to do this here because we can not inlcuide Snarkyjs in the 
 * api/queries module or the build fails.
 */
import { MerkleMap, Field, PublicKey } from "snarkyjs";
import { UID, NullifierProxy } from "@socialcap/contracts";
import { getNullifier } from "@apis/queries";

export async function buildNullifier(params: any) {

  const data = await getNullifier(params);
  if (!data)
    return null;

  const claimUid = params.claimUid;
  const senderAccountId =  params.senderAccountId;
  const electorKey = NullifierProxy.key(
    PublicKey.fromBase58(senderAccountId),
    UID.toField(claimUid)
  )

  const leafs = data?.leafs || [];
  const map = new MerkleMap();
  for (let j=0; j < leafs.length; j++) {
    const key = Field(leafs[j].key);
    const hashed = Field(leafs[j].hash);
    map.set(key, hashed);
    console.log(`Nullifier leaf ${key.toString()} ${hashed.toString()} ==? ${electorKey.toString()}`)
  }

  const nullifier: NullifierProxy = {
    root: map.getRoot(),
    witness: map.getWitness(electorKey)
  }

  return nullifier;
}