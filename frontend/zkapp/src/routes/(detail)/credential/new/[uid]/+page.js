/**
 * Params: 
 *  slug uid: the UID of the Master Plan
 */
import { error } from '@sveltejs/kit';

// this is only for testing/mockups
import { aClaim, aMasterPlan } from '@models/mockup-objects';

/** @type {import('./$types').PageLoad} */
export async function load({ params, route, url }) {
    if (params.slug !== "") {
      const planUid = params.uid;
      // const aMasterPlan = await API.get(planUid, ...);
      return { claim: aClaim, plan: aMasterPlan }; 
    }
    throw error(404, 'Not found');
}
