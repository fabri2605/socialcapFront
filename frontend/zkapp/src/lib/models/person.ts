export { Person }; 

type PersonState =  
  "INITIAL" | "PAYED" | "ACTIVE" | "REJECTED" | "PAUSED" | "INACTIVE";

class Person {
  /// from basic DB Claim Entity ///
  // ids and references 
  uid: string; 
  accountId: string;
  fullName: string; 
  description: string;
  state: PersonState;
  avatar: string; // logo image
  telegram: string;
  email: string;
  phone: string;
  preferences: any;
  roles: [];
  tags: [];
  // activity times
  createdUTC: string;
  updatedUTC: string;
  approvedUTC: string;
  //
  hash: string;

  constructor() {}

  static fromJSON(json: string | any, target?: Person): Person {
    const t: Person = Object.assign(
      (target || new Person()) as object, 
      (typeof json === 'string' ? JSON.parse(json) : json)
    );
    return t;
  }

  static mockup(): Person {
    return Person.fromJSON(JSON.stringify(aPersonMockup));
  }
}


/// Mockups ///

const aPersonMockup = {
  uid: "who1234",
  accountId: "",
  fullName: "Mario del Pino Alto",
  description: "Not much to say here ...",
  state: "APPROVED", 
  avatar: "https://bafybeie4kecy7dpmim7u7woenlgfvleuzqiryxp3uo334p3c5lczvs4n5m.ipfs.w3s.link/foto-para-twitter.jpg",
  telegram: "@mdpalto",
  email: "mdpalto@gmail.com",
  phone: "",
  preferences: {},
  // activity times
  createdUTC: "1 May 2023",
  updatedUTC: "7 May 2023",
  approvedUTC: "12 May 2023",
  hash: "A62F345678...A0BC4"
}
