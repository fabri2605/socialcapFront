"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberState = exports.ProvableMember = void 0;
const snarkyjs_1 = require("snarkyjs");
const uid_js_1 = require("./uid.js");
const entity_state_1 = require("./entity-state");
const MemberState = new entity_state_1.EntityState([
    // valid states
    // 0-Not a member, 1-Plain member, 2-Validator, 3-Auditor 
    "NONE", "PLAIN", "VALIDATOR", "AUDITOR"
], {
    // transitions
    "NONE": ["PLAIN"],
    "PLAIN": ["VALIDATOR", "AUDITOR"],
    "VALIDATOR": ["PLAIN", "AUDITOR"],
    "AUDITOR": ["PLAIN", "VALIDATOR"],
});
exports.MemberState = MemberState;
class ProvableMember extends (0, snarkyjs_1.Struct)({
    personUid: snarkyjs_1.Field,
    communityUid: snarkyjs_1.Field,
    role: snarkyjs_1.Field /* 0-Not a member, 1-Plain member, 2-Validator, 3-Auditor */
}) {
    constructor(json) {
        super(json);
        this.fromJSON(json);
    }
    fromJSON(json) {
        this.personUid = uid_js_1.UID.toField(json.personUid);
        this.communityUid = uid_js_1.UID.toField(json.communityUid);
        this.role = (0, snarkyjs_1.Field)(json.role);
    }
    toJSON() {
        return {
            personUid: this.personUid.toString(),
            communityUid: this.communityUid.toString(),
            role: this.role.toString()
        };
    }
    hash() {
        return this.role;
    }
    key() {
        return snarkyjs_1.Poseidon.hash([this.communityUid, this.personUid]);
    }
}
exports.ProvableMember = ProvableMember;
