import {
  Field,
  MerkleMap,
  CircuitString,
  UInt32,
  Mina,
  PrivateKey,
  PublicKey
} from 'snarkyjs';

import { MerkleMapUpdate, LeafInstance, MerkleMapProxy } from "../CommunitiesContract.js";
import { ElectionsContract } from "../ElectionsContract.js"

import { ProvableTask } from "../models/provable-tasks.js";
import { ProvableElector } from "../models/nullifier.js";
import { aTask, aElector } from "./mockups.js";


export async function testUpdateTask(
  zkApp: ElectionsContract,
  senderAccount: PublicKey,
  senderKey: PrivateKey
) {
    // create a Community obj
    let o: ProvableTask = new ProvableTask(aTask);
    console.log(o);

    // we must simulate calling the Offchain storage

    // initialize a Merkle Map
    let mt = new MerkleMap();
    mt.set(Field(0), Field(0));
    const zeroRoot = mt.getRoot();

    // update the MerkleMap with aClaim
    let key = o.key();
    let hashed = o.hash(); // the struct hashed using Poseidon
    mt.set(key, hashed);

    // Map after update
    let map: MerkleMapProxy = {
      id: UInt32.from(6), // assign a dummy ID
      name: CircuitString.fromString("tasks"),
      root: mt.getRoot(),
      count: Field(2), // now we have 2 leafs
    }; 

    // prepare the Update transition 
    let updated: MerkleMapUpdate = {
      mapId: map.id,
      txId: Field(11),
      beforeRoot: zeroRoot,
      beforeLeaf: {
        key: key,
        hash: Field(0)
      },
      afterRoot: map.root,
      afterLeaf: { 
        key: key,
        hash: hashed
      }
    };

    // get the Witness from the given key
    // offchain: map.getWitness(key);
    let witness = mt.getWitness(key);

    // update transaction
    const txn = await Mina.transaction(senderAccount, () => {
      zkApp.updateTask(o, map, witness, updated);
    });
    await txn.prove();
    await txn.sign([senderKey]).send();

    const updatedRoot = zkApp.tasksRoot.get();
    console.log(JSON.stringify(updated, null, 2));
    console.log("updatedRoot=", updatedRoot);
}


export async function testUpdateNullifier(
  zkApp: ElectionsContract,
  senderAccount: PublicKey,
  senderKey: PrivateKey
) {
    // create a Community obj
    let o: ProvableElector = new ProvableElector(aElector);
    console.log(o);

    // we must simulate calling the Offchain storage

    // initialize a Merkle Map
    let mt = new MerkleMap();
    mt.set(Field(0), Field(0));
    const zeroRoot = mt.getRoot();

    // update the MerkleMap with aClaim
    let key = o.key();
    let hashed = o.hash(); // the struct hashed using Poseidon
    mt.set(key, hashed);

    // Map after update
    let map: MerkleMapProxy = {
      id: UInt32.from(8), // assign a dummy ID
      name: CircuitString.fromString("nullifier"),
      root: mt.getRoot(),
      count: Field(2), // now we have 2 leafs
    }; 

    // prepare the Update transition 
    let updated: MerkleMapUpdate = {
      mapId: map.id,
      txId: Field(11),
      beforeRoot: zeroRoot,
      beforeLeaf: {
        key: key,
        hash: Field(0)
      },
      afterRoot: map.root,
      afterLeaf: { 
        key: key,
        hash: hashed
      }
    };

    // get the Witness from the given key
    // offchain: map.getWitness(key);
    let witness = mt.getWitness(key);

    // update transaction
    const txn = await Mina.transaction(senderAccount, () => {
      zkApp.updateNullifier(o, map, witness, updated);
    });
    await txn.prove();
    await txn.sign([senderKey]).send();

    const updatedRoot = zkApp.nullifierRoot.get();
    console.log(JSON.stringify(updated, null, 2));
    console.log("updatedRoot=", updatedRoot);
}
