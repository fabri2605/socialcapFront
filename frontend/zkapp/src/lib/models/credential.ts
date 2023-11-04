import type { MasterPlan } from "./master-plan";
import type { Claim } from "./#claim";

export { CapCredential, aCredentialMockup } ;

class CapCredential {
  uid: string; // this is a UID different from the Claim uid
  communityUid: string;
  planUid: string;
  applicantUid: string; // UID
  accountId:  string; //

  // to be used in presentation
  type:  string; // derived form MasterPlan name for this credential
  description:  string;
  alias:  string;
  state: string; 
  issuedBy: string;
  stars: string; // if present in MasterPlan.metadata

  // Image for this credential, created using the MasterPlan template, 
  // claim data and metadata, the image file may be generated on IPFS or 
  // some other decentralized file storage such as ARWEAVE
  image: string;

  // activity times
  createdUTC: string;
  updatedUTC: string;
  votedUTC: string;
  issuedUTC: string;
  expiresUTC: "";
  
  // extra info
  metadata: object; // filled with MasterPlan metadata and MInting options 
  txId: string; // MINA transaction ID
  hash: string; // ??? Merkle Leaf hash necessary

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

  static mockup(): CapCredential {
    return CapCredential.fromJSON(JSON.stringify(aCredentialMockup));
  }
}


/// Mockups ///

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
  issuedUTC: "1 July 2023",
  expiresUTC: "",
  
  // extra info
  metadata: {}, // filled with MasterPlan metadata and MInting options 
  txId: "", // MINA transaction ID
  hash: "A62F345678...A0BC4" // ??? Merkle Leaf hash necessary
}
