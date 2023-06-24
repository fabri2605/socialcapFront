import { Field, CircuitString } from 'snarkyjs';

export { BigString } 

const MAX_LEN = 128; // max len of a CircuitString string

const BigString = (s: string) => new _BigString_(s);

class _BigString_ {
  private str;

  constructor(str: string) {
    this.str = str;
  }

  toFields(): Field[] {
    if (this.str.length < MAX_LEN) 
      return CircuitString.fromString(this.str).toFields();

    // if the string is greater than MAX_LEN we need to split it 
    // into different chunks of MAX_LEN size
    let buffer = this.str;
    let chunks: string[] = [];
    let j = 0;
    while (buffer.length > MAX_LEN) {
      chunks[j] = buffer.splice(0, MAX_LEN);
      j++;
    }
    chunks[j] = buffer; // the remaining 

    // create an array of fields from all chunks ...
    let fields: Field[] = [];
    (chunks || []).map((chunk, j) => {
      fields = fields.concat(CircuitString.fromString(chunk[j]).toFields());  
    })

    return fields;
  }
}
