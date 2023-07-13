/**
 * UID is a string representation of standard UUID version 4 without the dashes.
 * It makes it simpler to convert it to a Snarkyjs Field and viceversa.
 * 
 * Use:
 * ~~~~
 *    // Create a new UID
 *    let uid: string = UID.uuid4();
 * 
 *    // Convert it to a Field and an array of fields
 *    let f: Field = UID.toField(uid);
 *    lef f: Field[] = UID.toFields(uid);
 * 
 *    // Get an UID from a Field:
 *    let uid: string = UID.fromField(f);
 * ~~~
 */
import { Field } from "snarkyjs";

export { UID };

class UID {

  static uuid4(): string {
    return crypto.randomUUID().replace(/-/g,'');
  }

  static fromField(f: Field): string {
    return f.toBigInt().toString(16); // convert it to a Hex string!
  }

  static toField(uid: string): Field {
    return Field('0x'+uid);
  }

  static toFields(uid: string): Field[] {
    return UID.toField(uid).toFields();
  }
}