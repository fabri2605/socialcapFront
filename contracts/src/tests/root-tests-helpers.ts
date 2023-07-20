import {
  Field,
  MerkleMap,
  CircuitString,
  UInt32,
  Mina,
  PrivateKey,
  PublicKey
} from 'snarkyjs';

import { 
  MerkleMapUpdate,
  LeafInstance,
  MerkleMapProxy
} from '../RootContract.js';

import { ProvableCommunity } from "../models/provable-community.js";
import { ProvablePerson } from "../models/provable-person.js";
import { ProvableMember } from "../models/provable-member.js";
import { aCommunity, aPerson, aMember } from "./mockups.js";
import { RootContract } from "../RootContract.js";


export async function testUpdateCommunity(
  zkApp: RootContract,
  senderAccount: PublicKey,
  senderKey: PrivateKey
) {
    // create a Community obj
    let org: ProvableCommunity = new ProvableCommunity(aCommunity);
    console.log(org);

    // we must simulate calling the Offchain storage

    // initialize a Merkle Map
    let mt = new MerkleMap();
    mt.set(Field(0), Field(0));
    const zeroRoot = mt.getRoot();

    // update the MerkleMap with aCommunity
    let key = org.uid;
    let hashed = org.hash(); // the struct hashed using Poseidon
    mt.set(key, hashed);

    // Map after update
    let map: MerkleMapProxy = {
      id: UInt32.from(1), // assign a dummy ID
      name: CircuitString.fromString("orgs"),
      root: mt.getRoot(),
      count: Field(2), // now we have 2 leafs
    }; 

    // prepare the Update transition 
    let updated: MerkleMapUpdate = {
      mapId: map.id,
      txId: Field(10),
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
      zkApp.updateCommunity(org, map, witness, updated);
    });
    await txn.prove();
    await txn.sign([senderKey]).send();

    const updatedRoot = zkApp.communitiesRoot.get();
    console.log(JSON.stringify(updated, null, 2));
    console.log("updatedRoot=", updatedRoot);
}

export async function testUpdatePerson(
  zkApp: RootContract,
  senderAccount: PublicKey,
  senderKey: PrivateKey
) {
    // create a Community obj
    let o: ProvablePerson = new ProvablePerson(aPerson);
    console.log(o);

    // we must simulate calling the Offchain storage

    // initialize a Merkle Map
    let mt = new MerkleMap();
    mt.set(Field(0), Field(0));
    const zeroRoot = mt.getRoot();

    // update the MerkleMap with aCommunity
    let key = o.key();
    let hashed = o.hash(); // the struct hashed using Poseidon
    mt.set(key, hashed);

    // Map after update
    let map: MerkleMapProxy = {
      id: UInt32.from(2), // assign a dummy ID
      name: CircuitString.fromString("persons"),
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
      zkApp.updatePerson(o, map, witness, updated);
    });
    await txn.prove();
    await txn.sign([senderKey]).send();

    const updatedRoot = zkApp.personsRoot.get();
    console.log(JSON.stringify(updated, null, 2));
    console.log("updatedRoot=", updatedRoot);
}

export async function testUpdateMember(
    zkApp: RootContract,
    senderAccount: PublicKey,
    senderKey: PrivateKey
  ) {
    let o: ProvableMember = new ProvableMember(aMember);
    console.log(o);

    // we must simulate calling the Offchain storage

    // initialize a Merkle Map
    let mt = new MerkleMap();
    mt.set(Field(0), Field(0));
    const zeroRoot = mt.getRoot();

    // update the MerkleMap with aCommunity
    let key = o.key();
    let hashed = o.hash(); // the struct hashed using Poseidon
    mt.set(key, hashed);

    // Map after update
    let map: MerkleMapProxy = {
      id: UInt32.from(3), // assign a dummy ID
      name: CircuitString.fromString("members"),
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
      zkApp.updateMember(o, map, witness, updated);
    });
    await txn.prove();
    await txn.sign([senderKey]).send();

    const updatedRoot = zkApp.membersRoot.get();
    console.log(JSON.stringify(updated, null, 2));
    console.log("updatedRoot=", updatedRoot);
}

