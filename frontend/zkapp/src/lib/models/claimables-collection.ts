/**
 * An ordered list of all "claimable" MasterPlans still available, 
 * restricted to the communities where he/she is a member.
 * 
 * What is a "claimable" MasterPlan (or a claimable credential) ? One 
 * which still has remaining (not issued) credentials (available > 0) 
 * and where the endsUTC <= current date.
 */
import type { MasterPlan } from "./master-plan";

export { ClaimablesCollection };

export type { Claimable };

type Claimable = {
  uid: string, // the UID of the MasterPlan ...
  state: string,
  community: string,
  name: string, 
  description: string,
  image: string,
  startsUTC: string,
  endsUTC: string,
  available: number,
  total: number
}

class ClaimablesCollection {

  constructor() {};

  /**
   * Return all claimables which can be claimed by this user.
   */
  async get(userUid: string): Promise<Claimable[]> {
    return ClaimablesCollection.mockup();
  }

  static mockup(): Claimable[] {
    let ls: Claimable[] = [];
    for (var j=0; j < claimableCredentialsMockup.length; j++) {
      ls.push(claimableCredentialsMockup[j]);
    }  
    return ls;
  }
};


const claimableCredentialsMockup = [
  { uid: "plan1234",
    community: "True Grass Eaters DAO", 
    state: "AVAILABLE",
    name: "Best dev in town", 
    description: "Developers skill demonstrated for ZK Knowledge building...",
    startsUTC: "2 May 2023",
    endsUTC: "2 Aug 2023",
    available: 3,
    total: 8,
    image: "https://nftstorage.link/ipfs/bafybeignqpmsfdpvtko7zbojxns5ifjaki7vm7x5geb4jsq5xstnjy7uai/image", 
  },
  { uid: "plan1235",
    community: "True Grass Eaters DAO", 
    state: "AVAILABLE",
    name: "Freindly support", 
    description: "Helped others achieve their goals",
    startsUTC: "2 May 2023",
    endsUTC: "2 Aug 2023",
    available: 1,
    total: 5,
    image: "https://nftstorage.link/ipfs/bafybeignqpmsfdpvtko7zbojxns5ifjaki7vm7x5geb4jsq5xstnjy7uai/image", 
  },
  { uid: "plan1236",
    community: "True Grass Eaters DAO", 
    state: "AVAILABLE",
    name: "Freindly support", 
    description: "Helped others achieve their goals",
    startsUTC: "2 May 2023",
    endsUTC: "2 Aug 2023",
    available: 1,
    total: 5,
    image: "https://nftstorage.link/ipfs/bafybeignqpmsfdpvtko7zbojxns5ifjaki7vm7x5geb4jsq5xstnjy7uai/image", 
  },
  { uid: "plan1237",
    community: "True Grass Eaters DAO", 
    state: "AVAILABLE",
    name: "Freindly support", 
    description: "Helped others achieve their goals",
    startsUTC: "2 May 2023",
    endsUTC: "2 Aug 2023",
    available: 1,
    total: 5,
    image: "https://nftstorage.link/ipfs/bafybeignqpmsfdpvtko7zbojxns5ifjaki7vm7x5geb4jsq5xstnjy7uai/image", 
  },
];
