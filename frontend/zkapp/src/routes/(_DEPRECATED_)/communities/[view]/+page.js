/**
 * Params: 
 *  slug uid: the UID of the Master Plan
 */
import { error } from '@sveltejs/kit';
import { getAllCommunities, getMyCommunities } from '@apis/clients';

// this is only for testing/mockups
import { olClaimables, olCredentials, olSubmitedClaims } from '@models/mockup-objects';

/** @type {import('../$types').PageLoad} */
export async function load({ params, route, url }) {
    if (params.view) {
      return { 
        view: params.view,
        all: getAllCommunities(), 
        joined: getMyCommunities() 
      }; 
    }
    throw error(404, 'Not found');
}
