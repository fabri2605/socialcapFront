// import { MemoryStore, Store } from 'snarky-smt';
import { isReady, Field, Struct, PublicKey, UInt64, UInt32, PrivateKey, MerkleWitness, } from 'snarkyjs';
import { LevelStore } from './lib/store/level_store.js';
import { Level } from 'level';
import { SparseMerkleTree } from './lib/smt/smt.js';
import { SMTUtils } from './lib/smt/proofs.js';
import { dts } from './utils.js';
import { randomInt } from 'crypto';
await isReady;
const doProofs = true;
class MyMerkleWitness extends MerkleWitness(8) {
}
// memory data store for Field type data, you can use any CircuitValue from snarkyjs or a custom composite CircuitValue
// let store: Store<Field> = new MemoryStore<Field>();
//const levelDb = new Level<string, any>('./db');
//let store: Store<Field> = new LevelStore<Field>(levelDb, Field, 'test');
//console.log(store);
//////////////////////////////////////////////////////////////////
class Account extends Struct({
    address: PublicKey,
    balance: UInt64,
    nonce: UInt32,
}) {
}
// Create a memory store
// let store = new MemoryStore<Account>();
// Or create a level db store:
const levelDb = new Level('./db');
let store = new LevelStore(levelDb, Account, 'test');
console.log(`${dts()} Created LevelStore store, levelDb`);
// Prepare some new test data
let testKey = Field(randomInt(999));
let testValue = new Account({
    address: PrivateKey.random().toPublicKey(),
    balance: UInt64.from(100),
    nonce: UInt32.from(0),
});
let newValue = new Account({
    address: PrivateKey.random().toPublicKey(),
    balance: UInt64.from(50),
    nonce: UInt32.from(1),
});
console.log(`${dts()} Created test K=${testKey} V=`, testValue);
//let smt = await SparseMerkleTree.build(store, Field, Account);
// Or import a tree by store
// let smt = await SparseMerkleTree.import<Field, Account>(store);
let smt = await SparseMerkleTree.import(store, Field, Account);
console.log(`${dts()} Imported smt from store smt=...`);
// Update the Tree with the new K,V
const root = await smt.update(testKey, testValue);
console.log(`${dts()} Updated smt with new K=${testKey},V=${JSON.stringify(testValue), null, 2}), root=`, root.toString());
// Create a compacted merkle proof for a key against the current root.
const cproof = await smt.proveCompact(testKey);
console.log(`${dts()} Built proof for K=${testKey}, proof=`, JSON.stringify(cproof, null, 2));
// Verify the compacted Merkle proof outside the circuit.
const ok = SMTUtils.verifyCompactProof(cproof, root, testKey, Field, testValue, Account);
console.log(`${dts()} Verified proof (outside circuit), ok=`, ok);
// Create a merkle proof for a key against the current root.
const proof = await smt.prove(testKey);
console.log(`${dts()} Created merkle proof for K=${testKey} against the current root, proof=`, JSON.stringify(proof, null, 2));
// Check membership OUTSIDE the circuit, isOk should be true.
let isIn = SMTUtils.checkMembership(proof, root, testKey, Field, testValue, Account);
console.log(`${dts()} Check membership (outside circuit), K=${testKey} isIn=`, isIn);
// Check Non-membership in the circuit, isNot should be false.
const nonTestKey = Field(9999);
let isNot = SMTUtils.checkNonMembership(proof, root, testKey, Field);
console.log(`${dts()} Check Non membership (outside circuit), K=${testKey} isNotIn=`, isNot);
// Calculate new root outside the circuit
let newRoot = SMTUtils.computeRoot(proof.sideNodes, testKey, Field, newValue, Account);
console.log(`${dts()} Calculate new root (outside circuit), root=`, newRoot.toString());
/*
// Create a merkle proof for a key against the current root.
const proof = await smt.prove(testKey);
console.log(`${dts()} Created merkle proof for  K=${testKey} against the current root, proof=`, proof);

// Check membership in the circuit, isOk should be true.
let isOk = ProvableSMTUtils.checkMembership(
  proof,
  root,
  testKey,
  Field,
  testValue,
  Account
);
console.log(`${dts()} Check membership  K=${testKey} in the circuit, ok true=`, isOk);

// Check Non-membership in the circuit, isOk should be false.
isOk = ProvableSMTUtils.checkNonMembership(proof, root, testKey, Field);
console.log(`${dts()} Check Non membership in the circuit, ok false=`, isOk);
*/
console.log(`${dts()} Done !\n\n`);
//# sourceMappingURL=index.js.map