import { Claim } from "./claim";

export { ClaimsCollection, olClaimablesMockup, olSubmitedClaimsMockup }

class ClaimsCollection {

  static async getIssued(): Promise<Claim[]> {
    // call API
    return [];
  }

  static fromJSON(json: string): ClaimsCollection {
    let collection = [];
    let items = JSON.parse(json);
    for (var j=0; j < items.length; j++) {
      let obj = Claim.fromJSON(JSON.stringify(items[j]))
      collection.push(obj);
    }
    return collection;
  } 
}


/// MOCKUPS ///

const olClaimablesMockup = [
  { uid: "c1", type: "Best dev in town", description: "Developers skill demonstrated fro ZK Knowledge building..."},
  { uid: "c2", type: "Freindly support", description: "Helped others achieve their goals"},
  { uid: "c3", type: "Best dev in town", description: "Developers skill demonstrated fro ZK Knowledge building..."},
  { uid: "c4", type: "Freindly support", description: "Helped others achieve their goals"},
  { uid: "c5", type: "Best dev in town", description: "Developers skill demonstrated fro ZK Knowledge building..."},
  { uid: "c6", type: "Freindly support", description: "Helped others achieve their goals"},
];

const olSubmitedClaimsMockup = [
  { uid: "c1", type: "Best dev in town", description: "Developers skill demonstrated fro ZK Knowledge building..."},
  { uid: "c2", type: "Freindly support", description: "Helped others achieve their goals"},
];
