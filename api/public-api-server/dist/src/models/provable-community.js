"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProvableCommunity = void 0;
const snarkyjs_1 = require("snarkyjs");
const uid_1 = require("./uid");
const datetime_1 = require("./datetime");
const COMMUNITY_STATES = [
    "", "REVISION", "APPROVED", "PAYMENT", "ACTIVE",
    "DELETED", "CANCELED", "PAUSED"
];
class ProvableCommunity extends (0, snarkyjs_1.Struct)({
    uid: snarkyjs_1.Field,
    state: snarkyjs_1.CircuitString,
    accountId: snarkyjs_1.PublicKey,
    name: snarkyjs_1.CircuitString,
    description: snarkyjs_1.CircuitString,
    image: snarkyjs_1.CircuitString,
    createdUTC: snarkyjs_1.Field,
    updatedUTC: snarkyjs_1.Field,
    approvedUTC: snarkyjs_1.Field,
    adminUid: snarkyjs_1.Field
}) {
    constructor(json) {
        super(json);
        this.fromJSON(json);
    }
    fromJSON(json) {
        this.uid = uid_1.UID.toField(json.uid);
        this.accountId = json.accountId && snarkyjs_1.PublicKey.fromBase58(json.accountId) || this.accountId || snarkyjs_1.PublicKey.empty();
        this.name = snarkyjs_1.CircuitString.fromString(json.name || this.name);
        this.image = snarkyjs_1.CircuitString.fromString(json.image || this.image);
        this.description = snarkyjs_1.CircuitString.fromString(json.description || this.description);
        this.state = snarkyjs_1.CircuitString.fromString(json.state || this.state);
        this.approvedUTC = json.approvedUTC && datetime_1.UTCDateTime.fromString(json.approvedUTC) || this.approvedUTC;
        this.createdUTC = json.createdUTC && datetime_1.UTCDateTime.fromString(json.createdUTC) || this.createdUTC;
        this.updatedUTC = json.updatedUTC && datetime_1.UTCDateTime.fromString(json.updatedUTC) || this.createdUTC;
        this.adminUid = uid_1.UID.toField(json.adminUid || this.adminUid.toString());
        return this;
    }
    toJSON() {
        return {
            uid: this.uid.toString(),
            adminUid: this.adminUid.toString(),
            accountId: (this.accountId || snarkyjs_1.PublicKey.empty()).toBase58(),
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
    hash() {
        let fields = [];
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
            .concat(this.adminUid.toFields());
        return snarkyjs_1.Poseidon.hash(fields);
    }
    key() {
        return this.uid;
    }
}
exports.ProvableCommunity = ProvableCommunity;
