import { createHash } from 'crypto';
import { Field, Poseidon } from "snarkyjs";


export function uuidToField(uuid: string): Field {
  const hexWithoutHyphens = uuid.replace(/-/g, '');
  const hexWithPrefix = `0x${hexWithoutHyphens}`;
  const bigvalue = BigInt(hexWithPrefix);
  return Field(bigvalue);
}


export function hashString(str: string): Field {
  /* We use the Poeidon hash to hash a given long string */
  // we need to convert the String to an array of bytes
  const bytes = (new TextEncoder()).encode(str);
  //console.log("bytes=", bytes);
  // now we need the bytes array as an array of Fields
  const fields: Field[] = [];
  bytes.map((b: any): any => { fields.push(Field(b)) });
  //console.log("fields array=", fields);
  // now we can hash it using Poseidon
  const hash = Poseidon.hash(fields);
  //console.log("hash=", hash);
  return hash;
}

// DEPRECATED 
// export function hashJsonToBigint(json: string): bigint {
//   /*
//   By using the full 256-bit hash, the likelihood of generating duplicate hashes
//   is significantly reduced. However, it's important to note that due to the 
//   limited size of the output (32 bytes), there is still a possibility of 
//   collisions when hashing arbitrary-length strings.
//   */
//   const hash = createHash('sha256').update(json).digest();
//   const bigvalue = BigInt(`0x${hash.toString('hex')}`);
//   return bigvalue;
// }
// 
// export function uuidToBigint(uuid: string): bigint {
//   const hexWithoutHyphens = uuid.replace(/-/g, '');
//   const hexWithPrefix = `0x${hexWithoutHyphens}`;
//   const bigvalue = BigInt(hexWithPrefix);
//   return bigvalue;
// }
// 
// export function toHexa(bigi: bigint): string {
//   return `0x${bigi.toString(16)}`;
// }
