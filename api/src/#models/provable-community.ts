import { Field, Struct, CircuitString, PublicKey, Poseidon } from 'snarkyjs';
import { UID } from './uid.js';
import { UTCDateTime } from './datetime.js';

export { ProvableCommunity };

const COMMUNITY_STATES = [
  "", "REVISION", "APPROVED", "PAYMENT", "ACTIVE", 
  "DELETED","CANCELED","PAUSED"
];

class ProvableCommunity extends Struct({
  uid: Field,
  state: CircuitString, 
  accountId: PublicKey,
  name: CircuitString,
  description: CircuitString,
  image: CircuitString,
  createdUTC: Field,
  updatedUTC: Field,
  approvedUTC: Field,
  adminUid: Field
}) {

  constructor(json?: any) {
    super(json);
    this.fromJSON(json);
  }

  fromJSON(json: {
    uid: string,
    name?: string,
    description?: string,
    image?: string,
    accountId?: string,
    state?: string,
    createdUTC?: string,
    approvedUTC?: string,
    updatedUTC?: string,
    adminUid?: string
  }): this {
    this.uid = UID.toField(json.uid);
    this.accountId = json.accountId && PublicKey.fromBase58(json.accountId) || this.accountId || PublicKey.empty();
    this.name = CircuitString.fromString(json.name || this.name);
    this.image = CircuitString.fromString(json.image || this.image);
    this.description = CircuitString.fromString(json.description || this.description);
    this.state = CircuitString.fromString(json.state || this.state);
    this.approvedUTC = json.approvedUTC && UTCDateTime.fromString(json.approvedUTC) || this.approvedUTC;
    this.createdUTC = json.createdUTC && UTCDateTime.fromString(json.createdUTC) || this.createdUTC;
    this.updatedUTC = json.updatedUTC && UTCDateTime.fromString(json.updatedUTC) || this.createdUTC;
    this.adminUid = UID.toField(json.adminUid || this.adminUid.toString()); 
    return this;
  } 

  toJSON() {
    return {
      uid: this.uid.toString(),
      adminUid: this.adminUid.toString(),
      accountId: (this.accountId || PublicKey.empty()).toBase58(),
      name: this.name.toString(),
      description: this.description.toString(),
      image: this.image.toString(),
      state: this.state.toString(),
      approvedUTC: this.approvedUTC.toString(),
      createdUTC: this.createdUTC.toString(),
      updatedUTC: this.updatedUTC.toString(),
      //admins: this.admins.map(t => t.toString()),
      //validators: this.validators.map(t => (t as Field).toString()),
      //auditors: this.auditors.map(t => (t as Field).toString()),
      //plans: this.plans.map(t => (t as Field).toString()),
    };
  }

  hash(): Field {
    let fields: Field[] = [];
    fields = fields
      .concat(this.uid.toFields())
      .concat(this.accountId.toFields())
      .concat(this.name.toFields())
      .concat(this.description.toFields())
      .concat(this.state.toFields())
      .concat(this.image.toFields()) 
      .concat(this.approvedUTC.toFields())
      .concat(this.createdUTC.toFields()) 
      .concat(this.updatedUTC.toFields())
      .concat(this.adminUid.toFields())
    return Poseidon.hash(fields);
  }

  key(): Field {
    return this.uid;
  }
}
