import { error } from '@sveltejs/kit';
import { getCurrentSession } from '@models/current-session';
import { getCurrentUser } from '@models/current-user';
import { setApiClient } from '$lib/globals';
import { CoreAPIClient } from '@apis/core-api-client';

// this is only for testing/mockups
import { olClaimables, olCredentials, olSubmitedClaims, olTasks } from '@models/mockup-objects';
import { getAllCommunities, getMyCommunities } from '@apis/clients';

/** @type {import('./$types').PageLoad} */
export async function load({ params, route, url }) {
    console.log("+page.js load()");

    let isAuthenticated = getCurrentSession();
    let user;

    if (isAuthenticated) {
      let client = new CoreAPIClient(isAuthenticated);  
      setApiClient(client);
      user = await getCurrentUser();
    }  

    if (true) {
      return { 
        user: user,
        isAuthenticated: isAuthenticated,
        claimables: olClaimables,
        credentials: olCredentials, 
        submited: olSubmitedClaims,
        joined: getMyCommunities(), 
        allCommunities: getAllCommunities(),
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