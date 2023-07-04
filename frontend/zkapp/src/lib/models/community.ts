import type { MasterPlan } from "./master-plan";

export { Claim }; 

type CommunityState =  
  "REGISTERED" | "APPROVED" | "PAUSED" | "REJECTED";

class Community {
  /// from basic DB Claim Entity ///
  // ids and references 
  uid: string; 
  accountId: string;
  name: string; 
  description: string;
  state: CommunityState;
  image: string; // logo image

  constructor() {}

  static fromJSON(json: string, t: any): Claim {
    const t: Community = Object.assign(
      ((new Community()) || t) as object, 
      JSON.parse(json)
    );
    return t;
  }

  static mockup(): Community {
    return Community.fromJSON(JSON.stringify(aCommunityMockup));
  }
}


const aClaimMockup = {
  uid: "claim1234",
  communityUid: "comm1234",
  planUid: "plan1234",
  applicantUid: "user1234",
  accountId: "",

  type: "Core Team Member", // derived form MasterPlan name for this credential
  description: "Rewarding outstanding developers in our community",
  state: "VOTING", 
  community: "True Grass Eating DAO",
  image: "https://nftstorage.link/ipfs/bafybeignqpmsfdpvtko7zbojxns5ifjaki7vm7x5geb4jsq5xstnjy7uai/image", 

  // activity times
  createdUTC: "1 May 2023",
  updatedUTC: "7 May 2023",
  votedUTC: "",
  issuedUTC: "",
  dueUTC: "12 May 2023",
  
  // voting results
  requiredVotes: 4, // copied from MasterPlan
  currentVotes: 1,
  positiveVotes: 1,
  negativeVotes: 0,
  ignoredVotes: 0,

  // evidence data
  evidence: [{
      sid: 'tgid',
      label: "Your telegram account",
      type: "text",
      value: "@marucoPenguin"
    }, { 
      sid: 'more',  
      label: "Additional evidence for your claim",
      type: "note",
      value: "longnote + longnote + longnote",
    }, {
      sid: 'docfile',
      label: "Attach this file please ...",
      type: "file",
      value: "/files/0234...feA00.svg"
    }
  ],
  hash: "A62F345678...A0BC4"
}
