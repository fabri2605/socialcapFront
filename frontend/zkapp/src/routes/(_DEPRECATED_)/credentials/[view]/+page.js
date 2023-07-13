/**
 * Params: 
 *  slug uid: the UID of the Master Plan
 */
import { error } from '@sveltejs/kit';

// this is only for testing/mockups
import { olClaimables, olCredentials, olSubmitedClaims } from '@models/mockup-objects';

/** @type {import('../$types').PageLoad} */
export async function load({ params, route, url }) {
    if (params.view) {
      return { 
        view: params.view,
        claimables: olClaimables, 
        submited: olSubmitedClaims,
        credentials: olCredentials 
      }; 
    }
    throw error(404, 'Not found');
}
