import { Field, Struct, CircuitString, PublicKey, Poseidon } from 'snarkyjs';
import { UID } from './uid';
import { UTCDateTime } from './datetime';
import { EntityState } from "./entity-state";

export { ProvablePerson, PersonState };


const PersonState = new EntityState([
  // valid states
  "INITIAL", "ACTIVE", "CANCELED", "PAUSED"
], {
  // transitions
  "INITIAL": ["ACTIVE", "CANCELED", "PAUSED"],
  "ACTIVE": ["CANCELED", "PAUSED"],
  "PAUSED": ["ACTIVE", "CANCELED"],
  "CANCELED": [],
});


class ProvablePerson extends Struct({
  uid: Field,
  state: CircuitString, 
  accountId: PublicKey,
  fullName: CircuitString,
  description: CircuitString,
  image: CircuitString,
  telegram: CircuitString,
  email: CircuitString,
  phone: CircuitString,
  createdUTC: Field,
  updatedUTC: Field,
  approvedUTC: Field,
}) {
  constructor(json?: any) {
    super(json);
    this.fromJSON(json);
  }

  fromJSON(json: {
    uid: string,
    fullName?: string,
    description?: string,
    image?: string,
    accountId?: string,
    state?: string,
    createdUTC?: Date,
    approvedUTC?: Date,
    updatedUTC?: Date,
    telegram?: string,
    email?: string,
    phone?: string
  }) {
    this.uid = UID.toField(json.uid);
    this.accountId = json.accountId && PublicKey.fromBase58(json.accountId) || this.accountId || PublicKey.empty();
    this.fullName = CircuitString.fromString(json.fullName || this.fullName);
    this.image = CircuitString.fromString(json.image || this.image);
    this.description = CircuitString.fromString(json.description || this.description);
    this.state = CircuitString.fromString(json.state || this.state);
    this.approvedUTC = json.approvedUTC && UTCDateTime.fromString(json.approvedUTC.toString()) || this.approvedUTC;
    this.createdUTC = json.createdUTC && UTCDateTime.fromString(json.createdUTC.toString()) || this.createdUTC;
    this.updatedUTC = json.updatedUTC && UTCDateTime.fromString(json.updatedUTC.toString()) || this.createdUTC;
    this.telegram = CircuitString.fromString(json.telegram || this.telegram);
    this.email = CircuitString.fromString(json.email || this.email);
    this.phone = CircuitString.fromString(json.phone || this.phone);
  } 

  toJSON() {
    return {
      uid: this.uid.toString(),
      accountId: (this.accountId || PublicKey.empty()).toBase58(),
      fullName: this.fullName.toString(),
      description: this.description.toString(),
      image: this.image.toString(),
      state: this.state.toString(),
      approvedUTC: this.approvedUTC.toString(),
      createdUTC: this.createdUTC.toString(),
      updatedUTC: this.updatedUTC.toString(),
      email: this.email.toString(),
      phone: this.phone.toString(),
      telegram: this.telegram.toString()
    };
  }

  hash(): Field {
    let fields: Field[] = [];
    fields = fields
      .concat(this.uid.toFields())
      .concat(this.accountId.toFields())
      .concat(this.fullName.toFields())
      .concat(this.description.toFields())
      .concat(this.state.toFields())
      .concat(this.image.toFields()) 
      .concat(this.approvedUTC.toFields())
      .concat(this.createdUTC.toFields()) 
      .concat(this.updatedUTC.toFields())
      .concat(this.email.toFields())
      .concat(this.phone.toFields())
      .concat(this.telegram.toFields())
    return Poseidon.hash(fields);
  }

  key(): Field {
    return this.uid;
  }
}
