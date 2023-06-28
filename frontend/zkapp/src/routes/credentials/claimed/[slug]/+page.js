/**
 * Params: 
 *  slug uid: the UID of the Master Plan
 */
import { error } from '@sveltejs/kit';
import { getCurrentUser } from '@models/current-user';

// this is only for testing/mockups
import { aClaim } from '@models/mockup-objects';

/** @type {import('./$types').PageLoad} */
export async function load({ params, route, url }) {
    if (params.slug !== "") {
      const user = getCurrentUser();

      const claim = aClaim;

      return claim; 
    }
    throw error(404, 'Not found');
}
