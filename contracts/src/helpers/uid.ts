import { randomUUID } from 'crypto';
import { Field } from 'snarkyjs';

export { UID };

const UID = (s: string) => new _UID_(s);


/**
 * An UID class for managing uuid4() UUIDS used in the project,
 * with convertion to Field and viceversa.
 */
class _UID_ {
  private uid; 

  constructor(uid: string) {
    this.uid = uid || randomUUID().replace(/-/g, '');
  }

  toString(): string {
    return this.uid;
  }

  toField(): Field {
    const hexWithoutHyphens = this.uid.replace(/-/g, '');
    const hexWithPrefix = `0x${hexWithoutHyphens}`;
    // const bigvalue = BigInt(hexWithPrefix);
    return Field(hexWithPrefix);
  }
 
  toFields(): Field[] {
    return [this.toField()];
  }
}
