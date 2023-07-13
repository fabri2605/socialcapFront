
export { Task }; 

type TaskState =  "PENDING" | "DRAFT" | "COMPLETED" | "REJECTED";

class Task {
  // the basic DB Task Entity
  uid: string; 
  claimUid: string;
  assigneeUid: string;
  state: TaskState;
  assignedUTC: string;
  completedUTC: string;
  dueUTC: string;
  rewarded: string;
  reason: string;
  hash: string; 

  // extra data copied from Claim
  type: string;
  description: string;
  image: string;
  community: string;
  requiredVotes: number; 
  currentVotes: number;
  evidence: any[];

  constructor() {
    this.uid = "task1234";//randomUUID().replace(/-/g,'');
  }

  static fromJSON(json: string | any, target?: Task): Task {
    const t: Task = Object.assign(
      (target || new Task()) as object, 
      (typeof json === 'string' ? JSON.parse(json) : json)
    );
    return t;
  }

  static mockup(): Task {
    return Task.fromJSON(aTaskMockup);
  }
}


/// Mockups ///

const aTaskMockup = {
  uid: "task1234",
  claimUid: "claim1234",
  type: "Core Team Member", // derived form MasterPlan name for this credential
  description: "Rewarding outstanding developers in our community",
  community: "True Grass Eaters DAO",
  image: "https://nftstorage.link/ipfs/bafybeignqpmsfdpvtko7zbojxns5ifjaki7vm7x5geb4jsq5xstnjy7uai/image", 
  state: "PENDING",
  assignedUTC: "1 May 2023",
  completedUTC: "",
  dueUTC: "3 May 2023",
  currentVotes: 1,
  requiredVotes: 3,
  reason: "",
  alias: "Crypto pengüin",
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
}
