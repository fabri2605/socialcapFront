import { pseudoRandomBytes } from "crypto";
import { prisma } from "~/global";
import { Person } from '@prisma/client'

const ALL_STATES = [
  'PENDING', 'ACTIVE', 'VERIFIED', 'SUSPENDED', 'DELETED'    
];

const INACTIVE_STATES = [
  'SUSPENDED', 'DELETED'    
];

const PersonState = {

  isValid(state: string) {
    return ALL_STATES.includes(state.toUpperCase()); 
  },

  isAvailable(person: Person) {
    return !INACTIVE_STATES.includes(person.state.toUpperCase());
  }  
}

export {
  PersonState
} ;
