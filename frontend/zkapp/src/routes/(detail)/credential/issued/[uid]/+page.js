/**
 * Params: 
 *  slug uid: the UID of the Master Plan
 */
import { error } from '@sveltejs/kit';
import { getCurrentUser } from '@models/current-user';
import { getCredential } from '@apis/queries';

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
