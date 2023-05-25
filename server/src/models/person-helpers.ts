import { Person } from '@prisma/client'

const 
  ALL_STATES = ['PENDING', 'ACTIVE', 'VERIFIED', 'SUSPENDED', 'DELETED'],
  INACTIVE_STATES = ['SUSPENDED', 'DELETED'];

class PersonState {
  private me: Person;

  constructor(person: Person) {
    this.me = person;
  };

  updateState(state: string): any {
    if (! this.isValid(state)) 
      return null;
    this.me.state = state.toUpperCase();
    return this.me;
  };

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
