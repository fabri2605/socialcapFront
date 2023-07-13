
import { error } from '@sveltejs/kit';
import { 
  getCommunity, getAdminedPlans, getAdminedAuditors,
  getAdminedValidators, getAdminedMembers, getAdminedAdmins 
} from "@apis/clients";

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    if (params.uid !== "") {
        let obj = await getCommunity(params.uid);
        obj.plans = await getAdminedPlans(params.uid);
        obj.validators = await getAdminedValidators(params.uid);
        obj.auditors = await getAdminedAuditors(params.uid);
        obj.members = await getAdminedMembers(params.uid);
        obj.admins = await getAdminedAdmins(params.uid);
        return JSON.parse(JSON.stringify(obj));
    }

    throw error(404, 'Not found');
}