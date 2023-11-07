import { getCurrentUser } from '@models/current-user';

/** @type {import('./$types').PageLoad} */
export async function load({ params, route, url }) {
    let user = await getCurrentUser()
    return JSON.parse(JSON.stringify(user.profile)); 
}
