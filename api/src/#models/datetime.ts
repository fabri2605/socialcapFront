import { Field } from 'snarkyjs';

export { UTCDateTime, ISO8601 } ;

type ISO8601 = string; // 2023‐06‐23T20:20:11.000Z // UTC time

class UTCDateTime extends Field {

  static fromString(isoString?: ISO8601) {
    const utc = isoString || (new Date()).toISOString();
    const ts = (new Date(utc)).getTime();
    return Field(ts);
  }

//   toString(): string {
//     return this.utc;
//   }
// 
//   toField(): Field {
//     const ts = (new Date(this.utc)).getTime();
//     return Field(ts);
//   }
// 
//   toFields(): Field [] {
//     return [this.toField()]
//   }
}

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