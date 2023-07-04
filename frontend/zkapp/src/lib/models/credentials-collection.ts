import { CapCredential, aCredentialMockup } from './credential';

export { CredentialsCollection, olCredentialsMockup }

class CredentialsCollection {

  static async getIssued(): Promise<CapCredential[]> {
    // call API
    return [];
  }

  static fromJSON(json: string): CredentialsCollection {
    let collection = [];
    let items = JSON.parse(json);
    for (var j=0; j < items.length; j++) {
      let obj = CapCredential.fromJSON(JSON.stringify(aCredentialMockup))
      collection.push(obj);
    }
    return collection;
  } 
}


/// MOCKUPS ///

const olCredentialsMockup = [
  { uid: "c1", type: "Best dev in town", description: "Developers skill demonstrated fro ZK Knowledge building..."},
  { uid: "c2", type: "Freindly support", description: "Helped others achieve their goals"},
  { uid: "c3", type: "Best dev in town", description: "Developers skill demonstrated fro ZK Knowledge building..."},
];
