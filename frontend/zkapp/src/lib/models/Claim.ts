import type { MasterPlan } from "./MasterPlan";

export { Claim, aClaimMockup }; 

type ClaimState =  
  "STARTED" | "SUBMITED" | "ASSIGNED" | "VOTING" | 
  "CANCELED" | "APPROVED" | "REJECTED";

class Claim {
  uid: string; 
  planUid: string;
  communityUid: string; 
  applicantUid: string; 
  accountId: string;
  alias: string; // applicant full name or alias he would like to use
  state: ClaimState;

  // replicated from MasterPlan, but usefull to have them here
  type: string; // copied from MasterPlan name
  description: string; // copied from MasterPlan description
  community: string; // copied from Community name

  // activity times
  createdUTC: string;
  updatedUTC: string;
  votedUTC: string;
  issuedUTC: string;
  dueUTC: string;
  
  // voting results
  totalVotes: number;
  positiveVotes: number;
  negativeVotes: number;
  ignoredVotes: number;

  // evidence data and file links
  encryption: string;
  evidence: any[];
  hash: string; // evidence data hash?

  constructor(params?: {
    plan: MasterPlan,
    applicantUid: string,
  }) {
    this.uid = "claim1234";//randomUUID().replace(/-/g,'');
    this.planUid = params?.plan?.uid || "";
    this.communityUid = params?.plan?.communityUid || "";
    this.applicantUid = params?.applicantUid || "";
    this.state = "STARTED";
    this.title = params?.plan?.name || "";
    this.description = params?.plan?.description || "";

    // create slots for evidence data in the Claim object
    this.evidence = (params?.plan?.evidence || []).map((f) => {
      return { sid: f.sid, value: "", type: f.type };
    })
  }

  static fromJSON(json: string): Claim {
    const t: Claim = Object.assign(
      (new Claim()) as object, 
      JSON.parse(json)
    );
    return t;
  }
}


const aClaimMockup = {
  uid: "claim1234",
  communityUid: "comm1234",
  planUid: "",
  applicantUid: "",
  accountId: "",

  name: "short text",
  description: "longtext longtext",
  alias: "My crypto alias",
  state: "VOTING",

  // activity times
  createdUTC: "2023-05-01 15:07",
  updatedUTC: "2023-05-07 12:01",
  votedUTC: "",
  issuedUTC: "",
  dueUTC: "",
  
  // voting results
  totalVotes: 4,
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
