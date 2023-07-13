/**
 * An ordered list of all "pending" and "completed" tasks, assigned and done
 * by the current user,
 */
import { Task } from "./task";

export { TasksCollection };

class TasksCollection {

  /**
   * Return all tasks filtered by state/period and ordered by Newest or DueDate
   */
  static async get(filterBy?: any, orderedBy?: string): Promise<Task[]> {
    return [];
  }

  /**
   * Receives a JSON array and returns an array of Tasks
   */
  static fromJSON(json: string | any): Task[] {
    const ls = typeof json === 'string' ? JSON.parse(json) : json;
    const tasks: Task[] = [];
    for (var j = 0; j < ls.length; j++) {
      const t: Task = Task.fromJSON(ls[j]);
      tasks.push(t)
    }
    return tasks;
  }

  static mockup(): Task[] {
    return TasksCollection.fromJSON(
      pendingTasksMockup
      .concat(completedTasksMockup)
    );  
  }
};


const pendingTasksMockup = [
  {
    uid: "task1234",
    claimUid: "claim1234",
    type: "Core Team Member", // derived form MasterPlan name for this credential
    description: "Rewarding outstanding developers in our community",
    image: "https://nftstorage.link/ipfs/bafybeignqpmsfdpvtko7zbojxns5ifjaki7vm7x5geb4jsq5xstnjy7uai/image", 
    state: "PENDING",
    assignedUTC: "1 May 2023",
    completedUTC: "",
    dueUTC: "7 May 2023",
    currentVotes: 1,
    requiredVotes: 3
  },
  { 
    uid: "task1235",
    claimUid: "claim1235",
    community: "The Grass Eaters", 
    type: "Freindly support", 
    description: "Helped others achieve their goals",
    image: "https://nftstorage.link/ipfs/bafybeignqpmsfdpvtko7zbojxns5ifjaki7vm7x5geb4jsq5xstnjy7uai/image", 
    state: "PENDING",
    assignedUTC: "1 May 2023",
    completedUTC: "",
    dueUTC: "7 May 2023",
    currentVotes: 1,
    requiredVotes: 3
  },
];

const completedTasksMockup = [
  {
    uid: "task1015",
    claimUid: "claim1100",
    type: "Core Team Member", // derived form MasterPlan name for this credential
    description: "Rewarding outstanding developers in our community",
    image: "https://nftstorage.link/ipfs/bafybeignqpmsfdpvtko7zbojxns5ifjaki7vm7x5geb4jsq5xstnjy7uai/image", 
    state: "COMPLETED",
    assignedUTC: "1 May 2023",
    completedUTC: "12 May 2023",
    dueUTC: "22 May 2023",
    currentVotes: 3,
    requiredVotes: 3
  },
  { 
    uid: "task1016",
    claimUid: "claim102",
    community: "The Grass Eaters", 
    type: "Freindly support", 
    description: "Helped others achieve their goals",
    image: "https://nftstorage.link/ipfs/bafybeignqpmsfdpvtko7zbojxns5ifjaki7vm7x5geb4jsq5xstnjy7uai/image", 
    state: "COMPLETED",
    assignedUTC: "1 May 2023",
    completedUTC: "12 May 2023",
    dueUTC: "22 May 2023",
    currentVotes: 3,
    requiredVotes: 3
  },
  { 
    uid: "task1016",
    claimUid: "claim102",
    community: "The Grass Eaters", 
    type: "Freindly support", 
    description: "Helped others achieve their goals",
    image: "https://nftstorage.link/ipfs/bafybeignqpmsfdpvtko7zbojxns5ifjaki7vm7x5geb4jsq5xstnjy7uai/image", 
    state: "COMPLETED",
    assignedUTC: "1 May 2023",
    completedUTC: "12 May 2023",
    dueUTC: "22 May 2023",
    currentVotes: 3,
    requiredVotes: 3
  },
];
