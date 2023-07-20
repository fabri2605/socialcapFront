import { prisma } from "~/global.js";
import { Person } from "@prisma/client";

const 
  ALL_STATES = ['PENDING', 'ACTIVE', 'VERIFIED', 'SUSPENDED', 'DELETED'],
  INACTIVE_STATES = ['SUSPENDED', 'DELETED'];

class PersonState {
  static PENDING = 'PENDING';
  static ACTIVE = 'ACTIVE';
  static VERIFIED = 'VERIFIED';
  static SUSPENDED = 'SUSPENDED';
  static DELETED = 'DELETED';

  private me: Person;

  constructor(person: Person) {
    this.me = person;
  };

  static 
  isValid(state: string): boolean {
    return ALL_STATES.includes(state.toUpperCase()); 
  };

  isInactive(): boolean {
    return INACTIVE_STATES.includes(this.me.state.toUpperCase());
  };  
}

export {
  PersonState
} ;
