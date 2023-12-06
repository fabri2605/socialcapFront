
import { error } from '@sveltejs/kit';
import { getCommunity, getMyClaims, getMyCredentials } from '@apis/queries';
import { APPROVED } from "@models/states";
/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    if (params.uid !== "") {
        let obj = await getCommunity(params.uid);
        const claimed = await getMyClaims(params);
        const credentials = await getMyCredentials({...params, communityUid: params.uid});
        obj.claimed = claimed;
        obj.credentials = credentials;
        obj.approvedClaims = obj.claims.filter((c) => c.state == APPROVED);
        obj.claimables = []; // await getClaimables(params.uid)
        return JSON.parse(JSON.stringify(obj));
    }
    throw error(404, 'Not found');
}