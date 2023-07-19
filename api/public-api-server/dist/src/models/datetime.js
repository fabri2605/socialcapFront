"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UTCDateTime = void 0;
const snarkyjs_1 = require("snarkyjs");
class UTCDateTime extends snarkyjs_1.Field {
    static fromString(isoString) {
        const utc = isoString || (new Date()).toISOString();
        const ts = (new Date(utc)).getTime();
        return (0, snarkyjs_1.Field)(ts);
    }
}
exports.UTCDateTime = UTCDateTime;
/*
class UTCDateTime extends Date {
  private utc: ISO8601;

  constructor(isoString?: ISO8601) {
    super();
    this.utc = isoString || (new Date()).toISOString();
  }

  static fromField(ts: Field) {
    return new UTCDateTime();
  }

  toString(): string {
    return this.utc;
  }

  toField(): Field {
    const ts = (new Date(this.utc)).getTime();
    return Field(ts);
  }

  toFields(): Field [] {
    return [this.toField()]
  }
}
*/ 
