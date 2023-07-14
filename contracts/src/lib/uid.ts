import { Field } from "snarkyjs";
let crypto: any;
try {
  crypto = window && window.crypto; // exist in the browser
}
catch (e) {
  crypto = await import("crypto"); // or load from node
}

export { UID };

const UID = {

  uuid4: function(): string {
    return crypto.randomUUID().replace(/-/g,'');
  },

  fromField: function(f: Field): string {
    return f.toBigInt().toString(16); // convert it to a Hex string!
  },

  toField: function(uid: string): Field {
    let s = `0x${uid}`;
    let f: Field = Field(s);
    return Field(s);
  },

  toFields: function(uid: string): Field[] {
    return UID.toField(uid).toFields();
  }
}
