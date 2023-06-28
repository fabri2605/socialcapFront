
export { MasterPlan };

class MasterPlan {
  uid: string; 
  communityUid: string; // the community that will issue this Credential
  state: string; // state of this plan: DRAFT; ACTIVE; PAUSED; INACTIVE

  // how the claim or credential will be presented
  name: string;
  description: string; // we can use Markdown here

  // some images for styling the Claim/Credential cards
  logo: string; // a dataURI with the logo for use 
  background: string; // a dataURI with the background

  // a template for the credential image; such as an SVG or a free text template?
  // can  not define this yet, may be extended ...
  template: string; 

  // required evidence data the claimer needs to supply
  evidence: EvidenceField[];

  // extra claim content for Claimer and Validators ...
  instructions: Markdown; // validator instructions
  legal: Markdown; // legal warnings

  // fees and shares
  fee: number; // the fee in MINA required for this credential
  shares: {
    rewards: number;// percentaje of the fee that will go to validator rewards
    community: number; // percentaje of fee that will go to the community
    protocol: number // percentaje of fee that will go to the Protocol (Socialcap)
  };

  // claim parameters
  strategy: ClaimPlanStrategy; // the Strategy object
  expiration: 365; // days since issued when an issued credential wil expire (or 0 for no expiration)
  revocable: boolean; // if this credential can be revoked, by Who??? 
  startsUTC: string; // when claiming of this credential can start
  endsUTC: string;  // when claiming of this credential ends

  // standard activity times
  createdUTC: string;
  updatedUTC: string;
  approvedUTC: string;

  constructor() {
    this.uid = "plan1234"; //randomUUID();
  }

  static fromJSON(json: string): MasterPlan {
    const t: MasterPlan = Object.assign(
      (new MasterPlan()) as object, 
      JSON.parse(json)
    );
    return t;
  }
}


// Rich text content for validator and claimer, in Markdown format
type Markdown = string;

// Evidence fields to be filled by the Claimer
type EvidenceField = {
  sid: string, // a simple stringid for this field, such as 'tgaccount', etc 
  required: boolean,          // is required ?
  label: string,              // field label
  description: string,        // field description
  type: "text" | "file",      // field type
  extras: { 
    max: number | null,     //max number of chars in this field 
    allowed: string | null, // allowed File types
  }
}

// Strategies
type StrategyVariant = 
  "RandomAnonyomusValidators" | 
  "AllMembersAnonymousVoting" | 
  "NominatedValidators";

type ClaimPlanStrategy = {
  title: string,
  variant: StrategyVariant,
  min_validators: number,
  min_votes: number,
  min_psotive_votes: number,
  min_auditors: number,
  audit_frequency: number 
}
