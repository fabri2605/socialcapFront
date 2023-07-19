"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonState = exports.ProvablePerson = void 0;
const snarkyjs_1 = require("snarkyjs");
const uid_1 = require("./uid");
const datetime_1 = require("./datetime");
const entity_state_1 = require("./entity-state");
const PersonState = new entity_state_1.EntityState([
    // valid states
    "INITIAL", "ACTIVE", "CANCELED", "PAUSED"
], {
    // transitions
    "INITIAL": ["ACTIVE", "CANCELED", "PAUSED"],
    "ACTIVE": ["CANCELED", "PAUSED"],
    "PAUSED": ["ACTIVE", "CANCELED"],
    "CANCELED": [],
});
exports.PersonState = PersonState;
class ProvablePerson extends (0, snarkyjs_1.Struct)({
    uid: snarkyjs_1.Field,
    state: snarkyjs_1.CircuitString,
    accountId: snarkyjs_1.PublicKey,
    fullName: snarkyjs_1.CircuitString,
    description: snarkyjs_1.CircuitString,
    image: snarkyjs_1.CircuitString,
    telegram: snarkyjs_1.CircuitString,
    email: snarkyjs_1.CircuitString,
    phone: snarkyjs_1.CircuitString,
    createdUTC: snarkyjs_1.Field,
    updatedUTC: snarkyjs_1.Field,
    approvedUTC: snarkyjs_1.Field,
}) {
    constructor(json) {
        super(json);
        this.fromJSON(json);
    }
    fromJSON(json) {
        this.uid = uid_1.UID.toField(json.uid);
        this.accountId = json.accountId && snarkyjs_1.PublicKey.fromBase58(json.accountId) || this.accountId || snarkyjs_1.PublicKey.empty();
        this.fullName = snarkyjs_1.CircuitString.fromString(json.fullName || this.fullName);
        this.image = snarkyjs_1.CircuitString.fromString(json.image || this.image);
        this.description = snarkyjs_1.CircuitString.fromString(json.description || this.description);
        this.state = snarkyjs_1.CircuitString.fromString(json.state || this.state);
        this.approvedUTC = json.approvedUTC && datetime_1.UTCDateTime.fromString(json.approvedUTC.toString()) || this.approvedUTC;
        this.createdUTC = json.createdUTC && datetime_1.UTCDateTime.fromString(json.createdUTC.toString()) || this.createdUTC;
        this.updatedUTC = json.updatedUTC && datetime_1.UTCDateTime.fromString(json.updatedUTC.toString()) || this.createdUTC;
        this.telegram = snarkyjs_1.CircuitString.fromString(json.telegram || this.telegram);
        this.email = snarkyjs_1.CircuitString.fromString(json.email || this.email);
        this.phone = snarkyjs_1.CircuitString.fromString(json.phone || this.phone);
    }
    toJSON() {
        return {
            uid: this.uid.toString(),
            accountId: (this.accountId || snarkyjs_1.PublicKey.empty()).toBase58(),
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
    hash() {
        let fields = [];
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
            .concat(this.telegram.toFields());
        return snarkyjs_1.Poseidon.hash(fields);
    }
    key() {
        return this.uid;
    }
}
exports.ProvablePerson = ProvablePerson;
