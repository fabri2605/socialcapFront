/**
 * A Community factory.
 * 
 * Use:
 * ~~~
 *  import { mainZkapp } from '../zkapps.js';
 * 
 *  const community = Community({
 *    uid: UID(uid).toString(),
 *    fullName: "This is my name !",
 *    descriptions: "We are a BIIIIIG community, join us",
 *    state: State(COMMUNITY_STATES).set("INITIAL"),
 *    // maybe other optional fields ...
 *  });  
 * 
 *  // update MINA state suin smart contracts
 *  try {
 *    const tx = await mainZkapp.updateCommunitiesState(community);
 *    // ...  
 *  }
 *  catch (err) {
 *    // ...
 *  }
 * ~~~~   
 * 
 * Because we want this struct to be Provable we must restrict its 
 * field types to any of the SnarkyJS types (Field, etc...)
 */
import { Field, Struct, Bool, CircuitString, PublicKey, Poseidon } from 'snarkyjs';
import { UID } from '../helpers/uid.js';
import { UTCDateTime } from '../helpers/datetime.js';
import { State, CommunityState } from '../helpers/states.js';
import { BigString } from '../helpers/bigstring.js';

export { Community };

const Community = (params: any) => new _Community_().fromJSON(params);


class _Community_ extends Struct({
  uid: Field,
  accountId: PublicKey,
  fullName: String,
  description: String,
  state: String, 
  createdUTC: Field,
  updatedUTC: Field,
  approvedUTC: Field,
  admins: [] as Field[], // an array or Person UIDs
  validators: [] as Field[], // an array or Person UIDs
  auditors: [] as Field[], // an array or Person UIDs
  plans:  [] as Field[] // an array or ClaimPlan UIDs
  // members ? may be too large an array to include it here
  // claims ? dont sure we will need it here
  // credentials ? dont sure we will need it here 
}) {

  constructor(json?: any) {
    super(json);
    this.fromJSON(json);
  }

  fromJSON(json: {
    uid: string,
    fullName?: string,
    description?: string,
    accountId?: string,
    state?: string,
    createdUTC?: string,
    approvedUTC?: string,
    updatedUTC?: string,
    validators?: string[],
    auditors?: string[],
    admins?: string[],
    plans?: string[],
  }): this {
    this.uid = Field(json.uid);
    this.accountId = json.accountId && PublicKey.fromBase58(json.accountId) || this.accountId || PublicKey.empty();
    this.fullName = json.fullName || this.fullName;
    this.description = json.description || this.description;
    this.state = json.state || this.state;
    this.approvedUTC = json.approvedUTC && Field(json.approvedUTC) || this.approvedUTC;
    this.createdUTC = json.createdUTC && Field(json.createdUTC) || this.createdUTC;
    this.createdUTC = json.updatedUTC && Field(json.updatedUTC) || this.createdUTC;
    this.admins = json.admins && json.admins?.map(t => Field(t) as Field) || this.admins;
    this.validators = json.admins && json.validators?.map(t => Field(t) as Field) || this.admins;
    this.auditors = json.admins && json.auditors?.map(t => Field(t) as Field) || this.admins;
    this.plans = json.admins && json.plans?.map(t => Field(t) as Field) || this.admins;
    return this;
  } 

  toJSON() {
    return {
      uid: this.uid.toString(),
      accountId: (this.accountId || PublicKey.empty()).toBase58(),
      fullName: this.fullName.toString(),
      description: this.description.toString(),
      state: this.state.toString(),
      approvedUTC: this.approvedUTC.toString(),
      createdUTC: this.createdUTC.toString(),
      updatedUTC: this.updatedUTC.toString(),
      admins: this.admins.map(t => (t as Field).toString()),
      validators: this.validators.map(t => (t as Field).toString()),
      auditors: this.auditors.map(t => (t as Field).toString()),
      plans: this.plans.map(t => (t as Field).toString()),
    };
  }

  hash(): Field {
    let fields: Field[] = [];
    fields = fields
      .concat(this.uid.toFields())
      .concat(this.accountId.toFields())
      .concat(BigString(this.fullName+this.description+this.state).toFields())
      .concat([this.approvedUTC, this.createdUTC, this.updatedUTC])
      .concat(this.admins as [])
      .concat(this.validators as [])
      .concat(this.auditors as [])
      .concat(this.plans as []);
    return Poseidon.hash(fields);
  }
}
