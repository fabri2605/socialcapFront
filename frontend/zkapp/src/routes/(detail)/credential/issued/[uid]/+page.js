/**
 * Params: 
 *  slug uid: the UID of the Master Plan
 */
import { error } from '@sveltejs/kit';
import { getCurrentUser } from '@models/current-user';
import { getCredential } from '@apis/queries';

// this is only for testing/mockups
import { aCredential } from '@models/mockup-objects';

/** @type {import('./$types').PageLoad} */
export async function load({ params, route, url }) {
    if (params.uid !== "") {
      const user = getCurrentUser();
      const aCredential = await getCredential(params.uid)
      console.log("aCredential=", aCredential);
      return JSON.parse(JSON.stringify(aCredential)); 
    }
    throw error(404, 'Not found');
}
