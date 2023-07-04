/**
 * Params: 
 *  slug uid: the UID of the Master Plan
 */
import { error } from '@sveltejs/kit';

// this is only for testing/mockups
import { aProfile } from '@models/mockup-objects';

/** @type {import('./$types').PageLoad} */
export async function load({ params, route, url }) {
    return JSON.parse(JSON.stringify(aProfile)); 
}
