import { createHash } from 'crypto';
import { Field } from "snarkyjs";

export function uuidToBigint(uuid: string): bigint {
  const hexWithoutHyphens = uuid.replace(/-/g, '');
  const hexWithPrefix = `0x${hexWithoutHyphens}`;
  const bigvalue = BigInt(hexWithPrefix);
  return bigvalue;
}

export function hashJsonToBigint(json: string): bigint {
  /*
  By using the full 256-bit hash, the likelihood of generating duplicate hashes
  is significantly reduced. However, it's important to note that due to the 
  limited size of the output (32 bytes), there is still a possibility of 
  collisions when hashing arbitrary-length strings.
  */
  const hash = createHash('sha256').update(json).digest();
  const bigvalue = BigInt(`0x${hash.toString('hex')}`);
  return bigvalue;
}

export function toHexa(bigi: bigint): string {
  return `0x${bigi.toString(16)}`;
}
