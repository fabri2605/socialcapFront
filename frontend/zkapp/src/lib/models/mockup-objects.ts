
import { aCredentialMockup } from "./Credential";

export { aMasterPlan, aClaim, aCredentialMockup as aCredential };

/*
  MOCKUP LISTS

  - aClaimableCredentialsList
  - aCredentialsList
  - aClaimsList
  - aCommunitiesList
  - aTasksList
  - aAdminCommunitiesList

  MOCKUP SINGLE OBJECTS
  
  - aTask
  - aAdminCommunity
  - aCommunity
  - aProfile
  - aClaim DONE
  - aMasterPlan DONE
  - aCredential DONE
*/

const shorttext = "This is the Credential name";
const longtext = "This is a description of the Credential type, its goals and who can claim it when providing the necessary evidence. ";
const longnote = "This is a long note which may contain **markdown** elements inside it. "

const aMasterPlan = {
  uid: "mp1234", 
  communityUid: "co1234", // the community that will issue this Credential
  state: "ACTIVE", 

  // how the claim or credential will be presented
  name: "This is the Credential name",
  description: longtext+longtext+longtext, // we can use Markdown here
  card: { // some images for styling the Claim/Credential cards
    logo: "", // a dataURI with the logo for use 
    background: "", // a dataURI with the background
  },
  template: { // a template for the credential image, such as an SVG
    type: "",
    content: ""
  }, 

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
}


const aClaim = {
  uid: "claim1234",
  communityUid: "comm1234",
  planUid: "",
  applicantUid: "",
  accountId: "",

  name: shorttext,
  description: longtext+longtext,
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
      value: longnote+longnote+longnote,
    }, {
      sid: 'docfile',
      label: "Attach this file please ...",
      type: "file",
      value: "/files/0234...feA00.svg"
    }
  ],
  hash: "A62F345678...A0BC4"
}

