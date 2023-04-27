// import {
//     AccountUpdate,
//     Circuit,
//     Field,
//     isReady,
//     Mina,
//     method,
//     MerkleTree,
//     MerkleWitness,
//     Poseidon,
//     PublicKey,
//     Permissions,
//     PrivateKey,
//     prop,
//     SmartContract,
//     State,
//     state,
//     Struct,
//     UInt32,
// } from 'snarkyjs';

// class Account extends Struct {
//     @prop publicKey: PublicKey;
//     @prop points: UInt32;

//     constructor(publicKey: PublicKey, points: UInt32) {
//         super(publicKey, points);
//         this.publicKey = publicKey;
//         this.points = points;
//     }

//     hash(): Field {
//         return Poseidon.hash(this.toFields());
//     }

//     addPoints(n: number): Account {
//         return new Account(this.publicKey, this.points.add(n));
//     }
// }
// // To initiate tree root and tell the contract about our off-chain storage
// let initialCommitment: Field = Field(0);

// class Tree extends MerkleTree {
    
// }