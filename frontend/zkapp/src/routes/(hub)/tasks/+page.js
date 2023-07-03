/**
 * Params: 
 *  slug uid: the UID of the Master Plan
 */
import { error } from '@sveltejs/kit';

import { olTasks } from '@models/mockup-objects';

// this is only for testing/mockups

/** @type {import('./$types').PageLoad} */
export async function load({ params, route, url }) {
    if (true) {
      return {
        assigned: olTasks.filter((t) => t.state==='PENDING'),
        completed: olTasks.filter((t) => t.state==='COMPLETED'),
      }; 
    }
    throw error(404, 'Not found');
}
