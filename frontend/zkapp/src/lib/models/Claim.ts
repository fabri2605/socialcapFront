import type { MasterPlan } from "./MasterPlan";

export { Claim }; 

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

  constructor(params: {
    plan: MasterPlan,
    applicantUid: string,
  }) {
    this.uid = "claim1234";//randomUUID().replace(/-/g,'');
    this.planUid = params.plan.uid;
    this.communityUid = params.plan.communityUid;
    this.applicantUid = params.applicantUid;
    this.state = "STARTED";

    // create slots for evidence data in the Claim object
    this.evidence = (params.plan.evidence || []).map((f) => {
      return { sid: f.sid, value: "", type: f.type };
    })
  }
}
