import { Mina, PublicKey, PrivateKey } from "snarkyjs";

import { 
  COMMUNITIES_MERKLE_MAP,
  PERSONS_MERKLE_MAP,
  MEMBERS_MERKLE_MAP,
  PLANS_MERKLE_MAP,
  CLAIMS_MERKLE_MAP,
  CREDENTIALS_MERKLE_MAP,
  TASKS_MERKLE_MAP,
  NULLIFIER_MERKLE_MAP,
  LeafInstance,
  MerkleMapProxy, 
  MerkleMapUpdate, 
  MerkleMapWitness 
} from "~/dbs/merkle/index";

import { ProvablePerson } from "~/models/provable-person";
import { ProvableCommunity } from "~/models/provable-community";
import { ProvableMember } from "~/models/provable-member";

export { MinaService } ;

const TX_FEE = 100_000_000;

let sender = {
  accountId: PublicKey.fromBase58("B62qpffbtmeU3L2xt2k6X4WPP54uA4fSkkqsV99ZD39Y8nJ8N6eRgUa"),
  key: null
}


class MinaService {

  static async updatePersonsRootOrRaise(
    provable: ProvablePerson, 
    map: MerkleMapProxy, 
    witness: MerkleMapWitness, 
    updatedMerkle: MerkleMapUpdate
  ) {
    // try {
    //   let tx = await Mina.transaction(
    //     { sender: sender.accountId, fee: TX_FEE }, () => {
    //       // socialcapContract.updatePerson(
    //       //   provable as ProvablePerson,
    //       //   map, 
    //       //   witness,
    //       //   updatedMerkle
    //       // );}
    //     }
    //   );
    //   await tx.prove();
    //   tx.sign([senderKey]);
    //   let pendingTx = await tx.send();
    // }
    // catch (err: any) {
    //   revert();
    // }
  }

  static async updateCommunitiesRootOrRaise(
    provable: ProvableCommunity, 
    map: MerkleMapProxy, 
    witness: MerkleMapWitness, 
    updatedMerkle: MerkleMapUpdate
  ) {
  }  
}