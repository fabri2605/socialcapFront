"use strict";
exports.__esModule = true;
exports.hashData = void 0;
var snarkyjs_1 = require("snarkyjs");
/**
 * Hash using Poseidon an arbitrary object, or string.
 */
function hashData(obj) {
    // first stringify the data
    var json = typeof (obj) === 'string' ? obj : JSON.stringify(obj);
    // transforn the string into an array of bytes
    var bytes = (new TextEncoder()).encode(json);
    var fields = [];
    for (var j = 0; j < bytes.length; j++)
        fields.push((0, snarkyjs_1.Field)(bytes[j]));
    // now hash it
    return snarkyjs_1.Poseidon.hash(fields);
}
exports.hashData = hashData;
