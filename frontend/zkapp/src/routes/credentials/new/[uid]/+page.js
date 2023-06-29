/**
 * Params: 
 *  slug uid: the UID of the Master Plan
 */
import { error } from '@sveltejs/kit';
import { Claim } from '@models/Claim';
import { MasterPlan } from '@models/MasterPlan';
import { getCurrentUser } from '@models/current-user';

// this is only for testing/mockups
import { aMasterPlan } from '@models/mockup-objects';

/** @type {import('./$types').PageLoad} */
export async function load({ params, route, url }) {
    if (params.slug !== "") {
      const planUid = params.uid;

      // const aMasterPlan = await API.get(planUid, ...);
      const plan = MasterPlan.fromJSON(JSON.stringify(aMasterPlan));

      const user = getCurrentUser();

      const claim = new Claim({
        plan: plan,
        applicantUid: user.uid
      });

      return { claim: claim, plan: plan }; 
    }
    throw error(404, 'Not found');
}
