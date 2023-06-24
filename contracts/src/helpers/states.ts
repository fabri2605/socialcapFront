/**
 * An auxiliary class to manage state and state transitions
 * 
 * Use:
 * ~~~
 *    let state = CommunityState().set("INITIAL");
 *    // ...
 *    // latter on ...
 *    state = state.set("REVISION");
 * ~~~
 * 
 * Valid states must be expressed with an array of strings:
 * ~~~
 *    [
 *      "INITIAL", "REVISION","APPROVED","PAYMENT","ACTIVE",
 *      "DELETED","CANCELED","PAUSED"
 *    ]
 * ~~~
 * 
 * State transitions msut be expresed with an dictionary, where each entry is 
 * a valid state, and the value for this entry is an array of the possible 
 * valid states:
 * ~~~
 *    { 
 *      "INITIAL":  ["REVISION", "CANCELED"], 
 *      "REVISION": ["APPROVED", "CANCELED"],
 *      "APPROVED": ["PAYMENT", "CANCELED"],
 *      // ...
 *    }
 * ~~~
 * 
 * 
*/
export { State, CommunityState, PersonState, ClaimState };

const State = (valids: string[], transitions?: string[]) => 
  new _State_(valids, transitions);

const CommunityState = () => new _State_(COMMUNITY_STATES);

const PersonState = () => new _State_(PERSON_STATES);

const ClaimState = () => new _State_(CLAIM_STATES);


const COMMUNITY_STATES = [
  "", "REVISION", "APPROVED", "PAYMENT", "ACTIVE", 
  "DELETED","CANCELED","PAUSED"
];

const PERSON_STATES = [
  "", "REVISION", "APPROVED", "PAYMENT", "ACTIVE", 
  "DELETED","CANCELED","PAUSED"
];

const CLAIM_STATES = [
  "", "REVISION", "APPROVED", "PAYMENT", "ACTIVE", 
  "DELETED","CANCELED","PAUSED"
];


class _State_ {
  private current;
  private valids: string[];
  private transitions: null | object;

  constructor(valids: string[], transitions?: object) {
    this.valids = valids;
    this.transitions = transitions || null;
    this.current = "";
  }

  set(value: string) {
    if (! this.valids.includes(value)) return this;
    if (! this.isValidTransition(value)) return this;
    this.current = value;
    return this;
  }

  get(): string {
    return this.current;
  }

  private isValidTransition(value: string): boolean {
    if (! this.transitions) return true;
    return this.transitions[this.current].includes(value);
  }
}
