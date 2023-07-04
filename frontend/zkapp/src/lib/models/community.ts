
export { Community }; 

type CommunityState =  
  "DRAFT" | "APPROVED" | "PAUSED" | "REJECTED";

class Community {
  /// from basic DB Claim Entity ///
  // ids and references 
  uid: string; 
  accountId: string;
  name: string; 
  description: string;
  state: CommunityState;
  image: string; // logo image
  // activity times
  createdUTC: string;
  updatedUTC: string;
  approvedUTC: string;

  // extras 
  countMembers: number;
  countCredentials: number;

  constructor() {}

  static fromJSON(json: string | any, target?: Community): Community {
    const t: Community = Object.assign(
      (target || new Community()) as object, 
      (typeof json === 'string' ? JSON.parse(json) : json)
    );
    return t;
  }

  static mockup(): Community {
    return Community.fromJSON(JSON.stringify(aCommunityMockup));
  }
}


/// Mockups ///

const aCommunityMockup = {
  uid: "claim1234",
  accountId: "",
  name: "True Grass Eating DAO",
  description: "Rewarding outstanding developers in our community",
  state: "APPROVED", 
  image: "https://nftstorage.link/ipfs/bafybeignqpmsfdpvtko7zbojxns5ifjaki7vm7x5geb4jsq5xstnjy7uai/image", 
  countMembers: 0,

  // activity times
  createdUTC: "1 May 2023",
  updatedUTC: "7 May 2023",
  approvedUTC: "12 May 2023"
}
