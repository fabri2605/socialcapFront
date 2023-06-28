import type { MasterPlan } from "./MasterPlan";
import type { Claim } from "./Claim";

export { CapCredential, aCredentialMockup } ;

class CapCredential {
  uid: string; // this is a UID different from the Claim uid

  constructor(claim?: Claim, plan?: MasterPlan) {
    this.uid = "cred1234";
  }

  static fromJSON(json: string): CapCredential {
    const t: CapCredential = Object.assign(
      (new CapCredential()) as object, 
      JSON.parse(json)
    );
    return t;
  }
}

const aCredentialMockup = {
  uid: "claim1234",
  communityUid: "comm1234",
  planUid: "plan1234",
  applicantUid: "appl1234",
  accountId: "B62x...01234", //

  // to be used in presentation
  type: "Core Team Member", // derived form MasterPlan name for this credential
  description: "Rewarding outstanding developers in our community",
  alias: "Juan del Verde Prado",
  state: "ISSUED", 
  issuedBy: "True Grass Eating DAO",
  stars: "5", // if present in MasterPlan.metadata

  // Image for this credential, created using the MasterPlan template, 
  // claim data and metadata, the image file may be generated on IPFS or 
  // some other decentralized file storage such as ARWEAVE
  image: "https://nftstorage.link/ipfs/bafybeignqpmsfdpvtko7zbojxns5ifjaki7vm7x5geb4jsq5xstnjy7uai/image", 

  // activity times
  createdUTC: "2023-05-01 15:07",
  updatedUTC: "2023-05-07 12:01",
  votedUTC: "2023-07-01",
  issuedUTC: "2023-07-01",
  expiresUTC: "",
  
  // extra info
  metadata: {}, // filled with MasterPlan metadata and MInting options 
  txId: "", // MINA transaction ID
  hash: "A62F345678...A0BC4" // ??? Merkle Leaf hash necessary
}
