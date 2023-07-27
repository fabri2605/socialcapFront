/**
 * Params: 
 *  slug uid: the UID of the Master Plan
 */
import { error } from '@sveltejs/kit';
import { UID } from "@utilities/uid";

import { getPlan, getCommunity } from "@apis/queries";
import { getCurrentUser } from '@models/current-user';

/** @type {import('./$types').PageLoad} */
export async function load({ params, route, url }) {
  if (params.slug !== "") {
      const planUid = params.uid;
      let user = await getCurrentUser();

      const plan = await getPlan(planUid);

      const community = await getCommunity(plan.communityUid);

      let oClaim = {
        uid: UID.uuid4(),
        communityUid: plan.communityUid,
        planUid: plan.uid,
        applicantUid: user.uid,
        accountId: "",
        // derived form MasterPlan name for this credential
        type: plan.name, 
        description: plan.description,
        state: 1, // DRAFT
        community: community.name,
        image: plan.image, 
        // activity times
        createdUTC: null,
        updatedUTC: null,
        votedUTC: null,
        issuedUTC: null,
        dueUTC: plan.dueUTC,
        // voting results
        requiredVotes: plan.requiredVotes, // copied from MasterPlan
        requiredPositives: plan.requiredPositives,
        positiveVotes: 0,
        negativeVotes: 0,
        ignoredVotes: 0,
        // evidence data
        evidenceData: (plan.evidence || []).map((f) => {
          f.value = "";
          return f;
        })
      };

      return { 
        claim: oClaim, 
        plan: plan,
        community: community 
      }; 
    }
    throw error(404, 'Not found');
}
