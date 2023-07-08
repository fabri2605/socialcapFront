/**
 * Params: 
 *  slug uid: the UID of the Master Plan
 */
import { error } from '@sveltejs/kit';
import { getAdminedCommunities } from '@apis/clients';

// this is only for testing/mockups

/** @type {import('../$types').PageLoad} */
export async function load({ params, route, url }) {
    if (true) {
      return { 
        admined: getAdminedCommunities(), 
      }; 
    }
    throw error(404, 'Not found');
}
