/**
 * Params: 
 *  slug uid: the UID of the Master Plan
 */
import { error } from '@sveltejs/kit';

import { aTask } from '@models/mockup-objects';

// this is only for testing/mockups

/** @type {import('./$types').PageLoad} */
export async function load({ params, route, url }) {
    if (params.uid !== "") {
      return JSON.parse(JSON.stringify(aTask)); 
    }
    throw error(404, 'Not found');
}
