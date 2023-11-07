"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.UTCDateTime = void 0;
var snarkyjs_1 = require("snarkyjs");
var UTCDateTime = /** @class */ (function (_super) {
    __extends(UTCDateTime, _super);
    function UTCDateTime(ts) {
        return _super.call(this, ts) || this;
    }
    UTCDateTime.fromString = function (isoString) {
        var utc = isoString || (new Date()).toISOString();
        var ts = (new Date(utc)).getTime();
        return new UTCDateTime(ts);
    };
    UTCDateTime.now = function () {
        var utc = (new Date()).toISOString();
        var ts = (new Date(utc)).getTime();
        return new UTCDateTime(ts);
    };
    UTCDateTime.fromField = function (f) {
        var ts = Number(f.toBigInt()); // millisec since 1970 in UTC
        var utc = new Date(ts).toISOString();
        return utc;
    };
    UTCDateTime.prototype.toPrettyDate = function () {
        var ts = Number(this.toBigInt()); // millisec since 1970 in UTC
        var utc = new Date(ts);
        var mo = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
        return "".concat(utc.getDate(), " ").concat(mo[utc.getMonth()], " ").concat(utc.getFullYear());
    };
    UTCDateTime.prototype.toPrettyDateTime = function () {
        // utc.getHours()
        // utc.getMinutes()
        // utc.getSeconds
        // utc.getS
        return "";
    };
    return UTCDateTime;
}(snarkyjs_1.Field));
exports.UTCDateTime = UTCDateTime;
function testIt() {
    var createdUTC = "2023-05-01 12:01:01.000";
    var fi = UTCDateTime.fromString(createdUTC);
    var fi2str = UTCDateTime.fromField(fi);
    console.log("".concat(createdUTC, " | ").concat(fi.toString(), " | ").concat(fi2str));
}
//testIt();
