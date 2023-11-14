/**
 * UID is a string representation of standard UUID version 4 without the dashes.
 * It makes it simpler to convert it to a Snarkyjs Field and viceversa.
 * 
 * Use:
 * ~~~~
 *    // Create a new UID
 *    let uid: string = UID.uuid4();
 * ~~~
 */

export { UID };

class UID {

  static uuid4(): string {
    return crypto.randomUUID().replace(/-/g,'');
  }
}