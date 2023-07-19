"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonState = void 0;
const ALL_STATES = ['PENDING', 'ACTIVE', 'VERIFIED', 'SUSPENDED', 'DELETED'], INACTIVE_STATES = ['SUSPENDED', 'DELETED'];
class PersonState {
    constructor(person) {
        this.me = person;
    }
    ;
    static isValid(state) {
        return ALL_STATES.includes(state.toUpperCase());
    }
    ;
    isInactive() {
        return INACTIVE_STATES.includes(this.me.state.toUpperCase());
    }
    ;
}
exports.PersonState = PersonState;
PersonState.PENDING = 'PENDING';
PersonState.ACTIVE = 'ACTIVE';
PersonState.VERIFIED = 'VERIFIED';
PersonState.SUSPENDED = 'SUSPENDED';
PersonState.DELETED = 'DELETED';
