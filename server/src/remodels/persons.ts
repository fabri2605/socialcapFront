import { pseudoRandomBytes } from "crypto";
import { prisma } from "~/global";

const PERSON_VALID_STATES = [
  'PENDING', 'ACTIVE', 'VERIFIED', 'SUSPENDED', 'DELETED'    
];

export function isPersonValidState(state: string) {
  return PERSON_VALID_STATES.includes(state.toUpperCase()); 
}

export function isAvailable(person: any) {
  return !['SUSPENDED','DELETED'].includes(person.state.toUpperCase());
};
