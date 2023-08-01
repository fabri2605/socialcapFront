import { logger } from "../global.js";
import { 
  Mina, PublicKey, PrivateKey, MerkleMapWitness, CircuitString,
  Field, UInt32 
} from "snarkyjs";
import { 
  COMMUNITIES_MERKLE_MAP, PERSONS_MERKLE_MAP, MEMBERS_MERKLE_MAP,
  PLANS_MERKLE_MAP, CLAIMS_MERKLE_MAP, CREDENTIALS_MERKLE_MAP, TASKS_MERKLE_MAP,
  NULLIFIER_MERKLE_MAP, OffchainMerkleMap,
} from "../dbs/index.js";
import { 
  ProvablePerson, ProvableCommunity, ProvableMember, MerkleMapProxy,
  MerkleMapUpdate, CommunitiesContract, ClaimingsContract, ElectorsContract,
} from "@socialcap/contracts";
import { waitForTransaction } from "./mina-transactions.js";
export { MinaService, setMinaNetwork } ;

const TX_FEE = 200_000_000;

let deployer = {
  publicKey: PublicKey.fromBase58(process.env.DEPLOYER_ID as string),
  privateKey: PrivateKey.fromBase58(process.env.DEPLOYER_KEY as string)
}

let sender = {
  publicKey: PublicKey.fromBase58(process.env.SENDER_ID as string),
  privateKey: PrivateKey.fromBase58(process.env.SENDER_KEY as string)
}


function setMinaNetwork() {
  const   
    BERKELEY_URL = 'https://proxy.berkeley.minaexplorer.com/graphql',
    ARCHIVE_URL = 'https://archive.berkeley.minaexplorer.com/';

  const Berkeley = Mina.Network({
    mina: BERKELEY_URL, 
    archive: ARCHIVE_URL
  });

  Mina.setActiveInstance(Berkeley);
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
    //
  }
  
  static async updateNullifierRoot(
    map: OffchainMerkleMap,
    updatedMerkle: MerkleMapUpdate,
    params: any,
    onSuccess: (params: any) => void,
    onError: (params: any, error: any) => void
  ) {
    let mapProxy: MerkleMapProxy = {
      id: UInt32.from(map.id),
      name: CircuitString.fromString("nullifier"),
      root: map.getRoot(),
      count: Field(map.size())
    };
    let key = updatedMerkle.afterLeaf.key.toString();
    let witness: MerkleMapWitness = map.getWitness(key) as MerkleMapWitness;
    
    try {
      const publicKey = PublicKey.fromBase58(process.env.ELECTORS_CONTRACT_ID as string);
      logger.info(`Running ElectorsContract '${publicKey.toBase58()}' ...`)

      await ElectorsContract.compile();
      let zkContract = new ElectorsContract(publicKey);

      let txn = await Mina.transaction(
        { sender: deployer.publicKey, fee: TX_FEE }, () => {
          zkContract.updateNullifier(
            mapProxy,
            witness,
            updatedMerkle      
          )
        }
      );
      await txn.prove();
      await txn.sign([deployer.privateKey]);
      let pendingTx = await txn.send();

      waitForTransaction(
        pendingTx.hash() as string, 
        params, 
        onSuccess,
        onError
      )  
    }
    catch (err: any) {
      onError(params, err);
    }
  }
}
