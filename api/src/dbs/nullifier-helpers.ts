import { Field, MerkleMapWitness, PublicKey, UInt32 } from "snarkyjs";
import { UID, NullifierProxy, MerkleMapUpdate } from "@socialcap/contracts";
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


async function addElectorsToNullifier(
  map: OffchainMerkleMap,
  claimUid: string, 
  electors: any[]
): Promise<MerkleMapUpdate> {
  const cluid = UID.toField(claimUid);

  // get initial state
  let updated: MerkleMapUpdate = {
    mapId: UInt32.from(map.id),
    txId: Field(0),
    beforeRoot: map.getRoot(),
    afterRoot: map.getRoot(),
    beforeLeaf: {
      key: Field(0),
      hash: Field(0)
    },
    afterLeaf: {
      key: Field(0),
      hash: Field(0)
    }
  }

  // add electors to it
  for (let j=0; j < electors.length; j++) {
    let electorPuk = PublicKey.fromBase58(electors[j].accountId);
    let key = NullifierProxy.key(electorPuk, cluid);
    let skey = key.toString();

    await map.set(skey.toString(), ASSIGNED_VOTE); // assigned
    console.log(`addElectorsToNullifier ${j} \nroot=`, 
      map.getRoot().toString(), "\nkey=", skey
    );

    let witness = map.getWitness(skey) as any;
    if (!witness) raiseError.PreconditionFailed(
      `Could not get witness for MerkleMap=${NULLIFIER_MERKLE_MAP} key=${skey}`
    );

    const [witnessRoot, witnessKey] = witness.computeRootAndKey(
      ASSIGNED_VOTE /* WAS ASSIGNED BUT NOT VOTED YET */
    );
    console.log("witnessRoot=", 
      witnessRoot.toString(), "\nwitnessKey=", witnessKey.toString()
    );

    // we keep the last one 
    updated.afterLeaf.key = key; 
    updated.afterLeaf.hash = ASSIGNED_VOTE;
  }
  updated.afterRoot = map.getRoot();

  return updated;
}


async function getNullifierProxy(
  electorPuk: PublicKey,
  claimUid: Field
): Promise<NullifierProxy> {

  const map = await getNullifierOrRaise() as OffchainMerkleMap;

  const key = NullifierProxy.key(electorPuk, claimUid);
  const skey = key.toString();

  let witness = map.getWitness(skey) as any;
  if (!witness) raiseError.PreconditionFailed(
    `Could not get witness for MerkleMap=${map.id} key=${skey}`
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
