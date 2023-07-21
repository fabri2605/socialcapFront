import { error } from '@sveltejs/kit';
import { getCurrentUser } from '@models/current-user';

// this is only for testing/mockups
import { aProfile } from '@models/mockup-objects';

/** @type {import('./$types').PageLoad} */
export async function load({ params, route, url }) {
    let user = await getCurrentUser()
    return JSON.parse(JSON.stringify(user.profile)); 
}
