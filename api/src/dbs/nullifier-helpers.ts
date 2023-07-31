import { Field, MerkleMapWitness, PublicKey } from "snarkyjs";
import { UID, NullifierProxy } from "@socialcap/contracts";
import { OffchainMerkleStorage } from "./offchain-merkle-storage.js";
import { OffchainMerkleMap } from "./offchain-merkle-map.js";
import { NULLIFIER_MERKLE_MAP } from "./index.js"
import { raiseError } from "../responses.js";

export {
  addElectorsToNullifier,
  getNullifierProxy,
  getNullifierOrRaise
}

const ASSIGNED_VOTE = Field(1); 

interface NullifierUpdate {
  map: OffchainMerkleMap,
  endKey: Field,
  endHash: Field
}

async function addElectorsToNullifier(
  claimUid: string, 
  electors: any[]
): Promise<NullifierUpdate> {
  const cluid = UID.toField(claimUid);

  const map = await getNullifierOrRaise();

  // add electors to it
  let endKey, endHash;
  for (let j=0; j < electors.length; j++) {
    let electorPuk = PublicKey.fromBase58(electors[j].accountId);
    let key = NullifierProxy.key(electorPuk, cluid);
    let skey = key.toString();

    await map.set(skey.toString(), ASSIGNED_VOTE); // assigned
    console.log("addElectorsToNullifier \nroot=", 
      map.getRoot().toString(), "\nkey=", skey
    );

    let witness = map.getWitness(skey) as any;
    if (!witness) raiseError.PreconditionFailed(
      `Could not get witness for MerkleMap=${NULLIFIER_MERKLE_MAP} key=${skey}`
    );

    const [witnessRoot, witnessKey] = witness.computeRootAndKey(
      Field(1) /* WAS ASSIGNED BUT NOT VOTED YET */
    );
    console.log("addElectorsToNullifier \nwitnessRoot=", 
      witnessRoot.toString(), "\nwitnessKey=", witnessKey.toString()
    );

    endKey = key; endHash = ASSIGNED_VOTE;
  }

  return {
    map: map,
    endKey: endKey,
    endHash: endHash
  };  
}


async function getNullifierProxy(
  electorPuk: PublicKey,
  claimUid: Field
): Promise<NullifierProxy> {

  const map = await getNullifierOrRaise();

  const key = NullifierProxy.key(electorPuk, claimUid);
  const skey = key.toString();

  let witness = map.getWitness(skey) as any;
  if (!witness) raiseError.PreconditionFailed(
    `Could not get witness for MerkleMap=${mapid} key=${skey}`
  );

  console.log("getNullifierProxy root=", map.getRoot().toString(), "\nkey=", skey);
  const [witnessRoot, witnessKey] = witness.computeRootAndKey(
    ASSIGNED_VOTE /* WAS ASSIGNED BUT NOT VOTED YET */
  );
  console.log("witnessRoot=", witnessRoot.toString(), "\nwitnessKey=", witnessKey.toString());

  return {
    root: map.getRoot(),
    witness: witness as MerkleMapWitness
  };
}


async function getNullifierOrRaise(): Promise<OffchainMerkleMap> {
  let mapid = NULLIFIER_MERKLE_MAP;
  let rs = await OffchainMerkleStorage.getMerkleMap(mapid);
  if (rs.error) raiseError.DatabaseEngine(
    `Could not found merkle map id=${mapid}`
  )
  let map: OffchainMerkleMap = rs.data;
  return map;
}
