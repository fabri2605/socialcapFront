import { Field } from 'o1js';

export { UTCDateTime };
export type { ISO8601 };

type ISO8601 = string; // 2023‐06‐23T20:20:11.000Z // UTC time


class UTCDateTime extends Date {
  private utc: ISO8601; 

  constructor(isoString?: ISO8601) {
    super();
    this.utc = isoString || (new Date()).toISOString();
  }

  // now() {} ?

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