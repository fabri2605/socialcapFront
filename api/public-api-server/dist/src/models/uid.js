"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UID = void 0;
const snarkyjs_1 = require("snarkyjs");
const crypto_1 = require("crypto");
const UID = {
    uuid4: function () {
        return (0, crypto_1.randomUUID)().replace(/-/g, '');
    },
    fromField: function (f) {
        return f.toBigInt().toString(16); // convert it to a Hex string!
    },
    toField: function (uid) {
        let s = `0x${uid}`;
        return (0, snarkyjs_1.Field)(s);
    },
    toFields: function (uid) {
        return UID.toField(uid).toFields();
    }
};
exports.UID = UID;
