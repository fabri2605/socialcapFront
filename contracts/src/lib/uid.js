"use strict";
exports.__esModule = true;
exports.UID = void 0;
var snarkyjs_1 = require("snarkyjs");
var crypto_1 = require("crypto");
var UID = {
    uuid4: function () {
        return (0, crypto_1.randomUUID)().replace(/-/g, '');
    },
    fromField: function (f) {
        return f.toBigInt().toString(16); // convert it to a Hex string!
    },
    toField: function (uid) {
        var s = "0x".concat(uid);
        return (0, snarkyjs_1.Field)(s);
    },
    toFields: function (uid) {
        return UID.toField(uid).toFields();
    }
};
exports.UID = UID;
