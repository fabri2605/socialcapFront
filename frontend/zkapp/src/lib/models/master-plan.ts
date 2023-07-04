import { UID } from "../utility/uid";

export { MasterPlan, aMasterPlanMockup };

class MasterPlan {
  /// basic DB MasterPlan Entity ///
  // id and refrences 
  uid: string; 
  communityUid: string; // the community that will issue this Credential
  state: string; // state of this plan: DRAFT; ACTIVE; PAUSED; INACTIVE

  // how the claim or credential will be presented
  name: string;
  description: string; // we can use Markdown here

  // some images for styling the Claim/Credential cards
  image: string; // a dataURI with the logo for use 
  background: string; // a dataURI with the background
  // a template for the credential image; such as an SVG or a free text template?
  // can  not define this yet, may be extended ...
  template: string; 

  // required evidence data the claimer needs to supply
  evidence: EvidenceField[];

  // metadata to be included in NFT metadata when issuing/minting
  metadata: {}; // to be filled by Admin with a JSON object

  // extra claim content for Claimer and Validators ...
  instructions: Markdown; // validator instructions
  legal: Markdown; // legal warnings

  // fees and shares
  fee: number; // the fee in MINA required for this credential
  rewardsShare: number;// percentaje of the fee that will go to validator rewards
  communityShare: number; // percentaje of fee that will go to the community
  protocolShare: number // percentaje of fee that will go to the Protocol (Socialcap)

  // claim parameters
  strategy: ClaimPlanStrategy; // the Strategy object
  expiration: number; // days since issued when an issued credential wil expire (or 0 for no expiration)
  revocable: boolean; // if this credential can be revoked, by Who??? 
  total: number; // max number of this credentials which can be claimed
  available: number; // remaining (not issued) number which can be still be claimed
  startsUTC: string; // when claiming of this credential can start
  endsUTC: string;  // when claiming of this credential ends

  // standard activity times
  createdUTC: string;
  updatedUTC: string;
  approvedUTC: string;

  /// this is EXTRA data not present in the base Entity ///
  community: string;

  constructor() {
    this.uid = UID.uuid4(); 
  }

  static fromJSON(json: string): MasterPlan {
    const t: MasterPlan = Object.assign(
      (new MasterPlan()) as object, 
      JSON.parse(json)
    );
    return t;
  }

  static mockup(): MasterPlan {
    return MasterPlan.fromJSON(JSON.stringify(aMasterPlanMockup));
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


/// Mockups ///

const shorttext = "Core Team Member";
const longtext = "Rewarding our top level developers";
const longnote = "This is a long note which may contain **markdown** elements inside it. "

const aMasterPlanMockup = {
  uid: "mp1234", 
  communityUid: "co1234", // the community that will issue this Credential
  state: "ACTIVE", 

  // how the claim or credential will be presented
  name: shorttext,
  description: longtext, // we can use Markdown here
  card: { // some images for styling the Claim/Credential cards
    logo: "", // a dataURI with the logo for use 
    background: "", // a dataURI with the background
  },
  image: "https://nftstorage.link/ipfs/bafybeignqpmsfdpvtko7zbojxns5ifjaki7vm7x5geb4jsq5xstnjy7uai/image", 
  template: "", // a template for the credential image, such as an SVG

  // required evidence data the claimer needs to supply
  evidence: [{ 
      sid: 'tgid',
      required: true, // a required field
      label: "Your telegram account",
      description: "We need this in order to communicate with you.",
      type: "text",
      extras: { 
        max: 300, //max number of chars in this field 
      }
    }, { 
      sid: 'more',  
      required: true, // a required field
      label: "Additional evidence for your claim",
      description: "Please provide additional evidence to sustain your claim.",
      type: "note",
      extras: { 
        max: 1300, //max number of chars in this field 
      }
    }, {
      sid: 'docfile',
      required: false, // optional field
      label: "Attach this file please ...",
      description: "Please attach this file so we can verify it.",
      type: "file",
      extras: { 
        allowed: "svg,png", // allowed field types
      }
    }
  ],

  // fees and shares
  fee: 2, // the fee in MINA required for this credential
  shares: {
    rewards: 40,// percentaje of the fee that will go to validator rewards
    community: 40, // percentaje of fee that will go to the community
    protocol: 20 // percentaje of fee that will go to the Protocol (Socialcap)
  },

  // claim parameters
  expiration: 365, // days since issued when an issued credential wil expire (or 0 for no expiration)
  revocable: true, // if this credential can be revoked 
  strategy: {},
  links: [], // array of {value, text} 
  // when claiming of this credential can start and when it ends
  startsUTC: "2023-05-02", 
  endsUTC: "2023-08-02",

  // standard activity times
  createdUTC: "2021-01-01",
  updatedUTC: "2023-05-06",
  approvedUTC: "2021-02-06",

  // extra data from Community
  community: "True Grass Eaters DAO"
}
