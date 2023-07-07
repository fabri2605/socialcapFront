import { error } from '@sveltejs/kit';

// this is only for testing/mockups
import { olClaimables, olCredentials, olSubmitedClaims, olTasks } from '@models/mockup-objects';
import { getAllCommunities, getMyCommunities } from '@apis/clients';

/** @type {import('./$types').PageLoad} */
export async function load({ params, route, url }) {
    if (true) {
      return { 
        claimables: olClaimables,
        credentials: olCredentials, 
        submited: olSubmitedClaims,
        joined: getMyCommunities(), 
        assigned: olTasks.filter((t) => t.state==='PENDING'),
        stats: aStats
      }; 
    }
    throw error(404, 'Not found');
}

const aStats = {
  countCredential: 3,
  countCommunities: 30,
  countClaimables: 2,
  claimedCount: 1,
  joinedCount: 3,
  adminsCount: 1
}