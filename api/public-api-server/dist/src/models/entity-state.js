"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityState = void 0;
/*
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
*/
class EntityState {
    constructor(valids, transitions) {
        this.valids = valids;
        this.transitions = transitions || null;
        this.current = "";
    }
    set(value) {
        let val = (typeof (value) === 'number') ? this.valids[value] : value;
        if (!this.valids.includes(val))
            return this;
        if (!this.isValidTransition(val))
            return this;
        this.current = val;
        return this;
    }
    initial() {
        return this.valids[0];
    }
    get() {
        return this.current;
    }
    index(value) {
        value = value || this.current;
        for (let j = 0; j < this.valids.length; j++) {
            if (this.valids[j] === value)
                return j;
        }
        return -1;
    }
    isValidTransition(value) {
        if (!this.transitions)
            return true;
        return this.transitions[this.current].includes(value);
    }
    // experimental
    changeFrom(from0, to1) {
        if (!this.valids.includes(from0))
            return this.initial();
        if (!this.valids.includes(to1))
            return from0;
        this.set(from0).set(to1);
        return this.get();
    }
}
exports.EntityState = EntityState;
